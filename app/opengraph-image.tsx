import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "IEEE Week | CHRIST University";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage: "linear-gradient(to bottom right, #000000, #001220)",
          color: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Simple geometric logo stand-in if we don't fetch an external image */}
          <div style={{ display: "flex", fontWeight: "bold", fontSize: 32, letterSpacing: "-0.05em", color: "#00E5FF" }}>
            IEEE Week
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            padding: "0 100px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            The ultimate multi-society
            <br />
            technology summit.
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#A0AAB5",
              margin: 0,
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Join the IEEE CHRIST University Student Branch for a week of ideathons, workshops, and innovation.
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: 24,
              color: "#00E5FF",
              fontWeight: 500,
            }}
          >
            <span>Learn More &rarr;</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
