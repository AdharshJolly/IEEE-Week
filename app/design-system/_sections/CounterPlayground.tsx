"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";

/** Generic values that exercise one, two, three, four, large and decimal cases. */
const presets = [7, 42, 128, 2048, 1234567, 123456789012, 3.14, 0.07];

const round = (n: number) => Math.round(n * 100) / 100;

/** Interactive Counter: real value changes drive the real component. */
export function CounterPlayground() {
  const [value, setValue] = useState(42);
  return (
    <div className="flex flex-col gap-6">
      <p className="font-display text-[clamp(3rem,2rem+6vw,6.5rem)] leading-none font-bold tracking-[-0.04em]">
        <Counter value={value} tone="primary" surface="subtle" />
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          aria-label="Subtract one"
          onClick={() => setValue((v) => round(v - 1))}
        >
          −1
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label="Add one"
          onClick={() => setValue((v) => round(v + 1))}
        >
          +1
        </Button>
        {presets.map((preset) => (
          <Button
            key={preset}
            variant={preset === value ? "primary" : "ghost"}
            size="sm"
            aria-pressed={preset === value}
            onClick={() => setValue(preset)}
          >
            {preset}
          </Button>
        ))}
      </div>
    </div>
  );
}
