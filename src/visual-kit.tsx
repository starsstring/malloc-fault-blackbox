import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const C = {
  paper: "#f5f2eb",
  ink: "#24332f",
  soft: "#596b60",
  rust: "#bc6245",
  mint: "#547e70",
  pale: "#dce6d9",
  white: "#faf8f2",
};
export const sans = '"Microsoft YaHei", "Noto Sans SC", sans-serif';
export const mono = '"Consolas", monospace';
export const serif = 'Georgia, "Times New Roman", serif';
export const smooth = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
} as const;
export const heart = [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0];
export type SceneTiming = {
  frame: number;
  fps: number;
  at: (name: string) => number;
};
export const pos = (left: number, top: number): React.CSSProperties => ({
  position: "absolute",
  left,
  top,
});

export const Text: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  weight?: number;
  width?: number;
  children: React.ReactNode;
}> = ({ x, y, size = 48, color = C.ink, weight = 400, width, children }) => (
  <div
    style={{
      ...pos(x, y),
      fontFamily: sans,
      fontSize: size,
      color,
      fontWeight: weight,
      lineHeight: 1.3,
      letterSpacing: -1,
      width,
    }}
  >
    {children}
  </div>
);
export const Title: React.FC<{ children: React.ReactNode; size?: number }> = ({
  children,
  size = 103,
}) => (
  <Text x={120} y={190} size={size} weight={600}>
    {children}
  </Text>
);
export const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      ...pos(120, 818),
      maxWidth: 1680,
      fontFamily: sans,
      fontSize: 30,
      color: C.soft,
      lineHeight: 1.38,
      letterSpacing: 0,
    }}
  >
    {children}
  </div>
);
export const Kicker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      ...pos(120, 88),
      fontFamily: mono,
      fontSize: 24,
      letterSpacing: 3,
      color: C.rust,
    }}
  >
    {children}
  </div>
);
export const Code: React.FC<{
  lines: string[];
  active?: number;
  x?: number;
  y?: number;
  width?: number;
  size?: number;
}> = ({ lines, active = 0, x = 120, y = 570, width = 1090, size = 39 }) => (
  <div
    style={{
      ...pos(x, y),
      width,
      padding: "22px 24px",
      borderRadius: 15,
      background: "#e7e9df",
      border: "1px solid #cdd4c7",
    }}
  >
    {lines.map((line, i) => (
      <div
        key={line}
        data-code-active={i === active}
        style={{
          fontFamily: mono,
          fontSize: size,
          lineHeight: 1.55,
          color: C.ink,
          whiteSpace: "pre",
          padding: "0 12px",
          borderRadius: 5,
          background: i === active ? "#c9dbc5" : "transparent",
        }}
      >
        {line}
      </div>
    ))}
  </div>
);

export const Pixels: React.FC<{
  x: number;
  y: number;
  count?: number;
  size?: number;
  mode?: "color" | "unknown" | "zero";
  from?: number;
  paintAt?: number;
  opacity?: number;
}> = ({
  x,
  y,
  count = 16,
  size = 65,
  mode = "color",
  from = 0,
  paintAt,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        ...pos(x, y),
        width: 4 * (size + 10),
        height: Math.ceil(count / 4) * (size + 10),
        opacity,
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const painted =
          paintAt === undefined
            ? mode === "color"
            : frame >= paintAt + i * 0.12 * fps;
        return (
          <div
            key={i}
            style={{
              ...pos((i % 4) * (size + 10), Math.floor(i / 4) * (size + 10)),
              width: size,
              height: size,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: mono,
              fontSize: Math.max(26, size * 0.42),
              color: C.soft,
              background:
                mode === "zero"
                  ? "#dce8d7"
                  : painted
                    ? heart[i]
                      ? C.rust
                      : "#e2d8c8"
                    : "#dfe5dc",
              opacity: interpolate(
                frame,
                [from + i * 0.025 * fps, from + (0.35 + i * 0.025) * fps],
                [0, 1],
                smooth,
              ),
              scale: interpolate(frame, [from, from + 0.45 * fps], [0.86, 1], {
                ...smooth,
                output: "perceptual-scale",
              }),
            }}
          >
            {mode === "zero" ? "0" : painted ? "" : "?"}
          </div>
        );
      })}
    </div>
  );
};

export const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress?: number;
  color?: string;
  dashed?: boolean;
}> = ({ x1, y1, x2, y2, progress = 1, color = C.mint, dashed = false }) => {
  const x = x1 + (x2 - x1) * progress,
    y = y1 + (y2 - y1) * progress;
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
      }}
    >
      <path
        d={`M${x1} ${y1} L${x} ${y}`}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={dashed ? "10 10" : undefined}
      />
      <path
        d={`M${x - 18 * Math.cos(a - 0.45)} ${y - 18 * Math.sin(a - 0.45)} L${x} ${y} L${x - 18 * Math.cos(a + 0.45)} ${y - 18 * Math.sin(a + 0.45)}`}
        fill="none"
        stroke={color}
        strokeWidth={4}
      />
    </svg>
  );
};

export const CaseBadge: React.FC<{
  state: string;
  count?: number;
  muted?: boolean;
}> = ({ state, count = 8, muted = false }) => (
  <div
    style={{
      ...pos(1430, 56),
      width: 350,
      height: 98,
      borderBottom: "1px solid #c9cfc2",
      display: "flex",
      alignItems: "center",
      gap: 22,
      color: C.soft,
    }}
  >
    <div
      style={{
        width: 76,
        height: 76,
        display: "grid",
        gridTemplateColumns: "repeat(4, 15px)",
        gap: 4,
        alignContent: "center",
        opacity: muted ? 0.35 : 1,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            width: 15,
            height: 15,
            borderRadius: 2,
            background: heart[i] ? C.rust : "#dfd7c8",
          }}
        />
      ))}
    </div>
    <div>
      <div
        style={{
          fontFamily: mono,
          fontSize: 21,
          letterSpacing: 2,
          color: C.rust,
        }}
      >
        PIXEL / 01
      </div>
      <div style={{ fontFamily: sans, fontSize: 28, marginTop: 8 }}>
        {state}
      </div>
    </div>
  </div>
);

export const MovingPixels: React.FC<{
  start: number;
  end: number;
  x1: number;
  x2: number;
  y: number;
  size?: number;
}> = ({ start, end, x1, x2, y, size = 69 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          style={{
            ...pos(
              x1 + (i % 4) * (size + 10),
              y + Math.floor(i / 4) * (size + 10),
            ),
            width: size,
            height: size,
            borderRadius: 8,
            background: heart[i] ? C.rust : "#e2d8c8",
            translate: interpolate(
              frame,
              [start + i * 0.035 * fps, end + i * 0.035 * fps],
              ["0px 0px", `${x2 - x1}px 0px`],
              smooth,
            ),
            scale: interpolate(frame, [start, end], [1, 0.98], {
              ...smooth,
              output: "perceptual-scale",
            }),
          }}
        />
      ))}
    </>
  );
};

export const Pill: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  color?: string;
  size?: number;
}> = ({ x, y, children, color = C.rust, size = 35 }) => (
  <div
    style={{
      ...pos(x, y),
      padding: "12px 22px",
      border: `1px solid ${color}`,
      borderRadius: 10,
      color,
      fontFamily: sans,
      fontSize: size,
      background: "#f5f2ebf2",
    }}
  >
    {children}
  </div>
);
