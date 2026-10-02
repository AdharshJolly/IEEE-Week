import { specular, type SpecularPreset } from "@/lib/motion/tokens";

/*
 * SPECULAR engine: pointer-aware edge highlight for a button.
 *
 * The shader, SDF maths, pointer steering and proximity falloff are taken from
 * the React Bits `SpecularButton` (OGL). What differs: `ogl` is loaded lazily,
 * the GL context is only created once the pointer first comes within range
 * (and released when the button leaves the viewport), one shared pointer
 * listener serves every button, and the render loop sleeps whenever the
 * highlight is fully faded. Colours come from the `--specular-line` /
 * `--specular-base` custom properties (plain hex brand tokens), radius from
 * the button's own border radius, so nothing visual is hardcoded here.
 */

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uBaseAlpha;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45 * uBaseAlpha;

  // Symmetric specular: edges facing toward/away from the light both catch a
  // streak, windowed by an elliptical normal so it varies along straight edges.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

const toRad = Math.PI / 180;

/* ---- one shared pointer listener for every button ---- */

type PointerHandler = (e: PointerEvent) => void;
const handlers = new Set<PointerHandler>();

function onWindowPointer(e: PointerEvent) {
  if (e.pointerType === "touch") return;
  handlers.forEach((h) => h(e));
}

function subscribe(handler: PointerHandler) {
  if (handlers.size === 0) {
    window.addEventListener("pointermove", onWindowPointer, { passive: true });
  }
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
    if (handlers.size === 0) {
      window.removeEventListener("pointermove", onWindowPointer);
    }
  };
}

/* ---- per-button controller ---- */

interface GlState {
  dispose: () => void;
  render: (angle: number, bright: number) => void;
  readColors: () => void;
}

export interface SpecularOptions {
  button: HTMLElement;
  /** Empty, aria-hidden container the canvas is appended to. */
  fx: HTMLElement;
  preset: SpecularPreset;
}

/** Returns a cleanup function. Safe to call in an effect. */
export function attachSpecular({
  button,
  fx,
  preset,
}: SpecularOptions): () => void {
  const cfg = specular[preset];
  let destroyed = false;
  let visible = true;
  let gl: GlState | null = null;
  let loading = false;
  let raf = 0;

  let pointerAngle: number | null = null;
  let target = 0; // proximity, 0..1
  let angle = 0;
  let bright = 0;
  let last = 0;

  const release = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    gl?.dispose();
    gl = null;
    bright = 0;
    target = 0;
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) release();
  });
  io.observe(button);

  async function init() {
    loading = true;
    try {
      const { Renderer, Program, Mesh, Triangle, Color } = await import("ogl");
      if (destroyed || !visible) return;

      const dpr = window.devicePixelRatio || 1;
      const renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        dpr,
      });
      const ctx = renderer.gl;
      ctx.clearColor(0, 0, 0, 0);
      ctx.enable(ctx.BLEND);
      ctx.blendFunc(ctx.ONE, ctx.ONE_MINUS_SRC_ALPHA);

      const geometry = new Triangle(ctx);
      if (geometry.attributes.uv) delete geometry.attributes.uv;

      const program = new Program(ctx, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uCenter: { value: [0, 0] },
          uHalfSize: { value: [1, 1] },
          uRadius: { value: 0 },
          uAngle: { value: 0 },
          uPx: { value: dpr },
          uLineColor: { value: [1, 1, 1] },
          uBaseColor: { value: [0, 0, 0] },
          uIntensity: { value: 0 },
          uBaseAlpha: { value: 0 },
          uShineSize: { value: cfg.shineSize * toRad },
          uShineFade: { value: cfg.shineFade * toRad },
          uThickness: { value: cfg.thickness * dpr },
          uBaseWidth: { value: dpr },
        },
      });
      const mesh = new Mesh(ctx, { geometry, program });
      fx.appendChild(ctx.canvas);

      const lineC = new Color();
      const baseC = new Color();
      const pad = cfg.bleed;

      const resize = () => {
        // Fractional size + explicit centre pin the SDF to the exact border.
        const rect = button.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        renderer.setSize(w + pad * 2, h + pad * 2);
        program.uniforms.uCenter.value = [
          (pad + w / 2) * dpr,
          (pad + h / 2) * dpr,
        ];
        program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr];
        const radius = parseFloat(getComputedStyle(button).borderTopLeftRadius);
        program.uniforms.uRadius.value =
          Math.min(radius || 0, Math.min(w, h) / 2) * dpr;
      };
      const ro = new ResizeObserver(resize);
      ro.observe(button);
      resize();

      const readColors = () => {
        const cs = getComputedStyle(button);
        lineC.set(cs.getPropertyValue("--specular-line").trim() || "#ffffff");
        baseC.set(cs.getPropertyValue("--specular-base").trim() || "#000000");
        program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
        program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      };
      readColors();

      gl = {
        readColors,
        render: (a, b) => {
          program.uniforms.uAngle.value = a;
          program.uniforms.uIntensity.value = cfg.intensity * b;
          program.uniforms.uBaseAlpha.value = b;
          renderer.render({ scene: mesh });
        },
        dispose: () => {
          ro.disconnect();
          if (ctx.canvas.parentNode === fx) fx.removeChild(ctx.canvas);
          ctx.getExtension("WEBGL_lose_context")?.loseContext();
        },
      };
      angle = pointerAngle ?? 0;
      wake();
    } catch {
      // WebGL unavailable: the button simply keeps its normal look.
      destroyed = true;
    } finally {
      loading = false;
    }
  }

  const frame = (now: number) => {
    if (!gl) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (pointerAngle != null) {
      const diff =
        ((pointerAngle - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * cfg.steerRate));
    }
    bright += (target - bright) * (1 - Math.exp(-dt * cfg.brightRate));

    // Sleep once fully faded: no idle render loop.
    if (target === 0 && bright < 0.003) {
      bright = 0;
      gl.render(angle, 0);
      raf = 0;
      return;
    }
    gl.render(angle, bright);
    raf = requestAnimationFrame(frame);
  };

  function wake() {
    if (raf || !gl) return;
    gl.readColors();
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  const onPointer: PointerHandler = (e) => {
    if (destroyed || !visible) return;
    const rect = button.getBoundingClientRect();
    const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
    const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
    const dist = Math.hypot(dx, dy);
    const t = Math.max(0, 1 - dist / cfg.proximity);
    const next = t * t * (3 - 2 * t);
    if (next === 0 && target === 0) return;
    target = next;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (dist === 0) {
      // Over the button the light settles on the diagonal and sways gently.
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (cy - e.clientY) / (rect.height / 2);
      pointerAngle =
        Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
    } else {
      pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
    }

    if (gl) wake();
    else if (!loading && next > 0) void init();
  };
  const unsubscribe = subscribe(onPointer);

  return () => {
    destroyed = true;
    unsubscribe();
    io.disconnect();
    release();
  };
}
