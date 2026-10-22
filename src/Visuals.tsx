import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type Kind =
  | "opening"
  | "background"
  | "contract"
  | "inside"
  | "virtual"
  | "allocate"
  | "initialize"
  | "resize"
  | "failure"
  | "release"
  | "mistakes"
  | "fragment"
  | "practice"
  | "tradeoff"
  | "closing";
const C = {
  paper: "#f5f2eb",
  ink: "#24332f",
  soft: "#7f8a83",
  rust: "#bc6245",
  mint: "#547e70",
  pale: "#e3e9df",
  dark: "#142a2c",
  white: "#f7f5ef",
  red: "#ce6e5b",
};
const sans = '"Microsoft YaHei", "Noto Sans SC", sans-serif';
const mono = '"Consolas", monospace';
const serif = 'Georgia, "Times New Roman", serif';
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: ease,
} as const;
const heart = [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0];

const txt = (
  size: number,
  extra: React.CSSProperties = {},
): React.CSSProperties => ({
  fontFamily: sans,
  fontSize: size,
  lineHeight: 1.3,
  letterSpacing: -1.5,
  ...extra,
});
const position = (left: number, top: number): React.CSSProperties => ({
  position: "absolute",
  left,
  top,
});

const Word: React.FC<{
  children: React.ReactNode;
  x: number;
  y: number;
  size?: number;
  color?: string;
  weight?: number;
  serif?: boolean;
}> = ({
  children,
  x,
  y,
  size = 64,
  color = C.ink,
  weight = 500,
  serif: old = false,
}) => (
  <div
    style={{
      ...position(x, y),
      ...txt(size, {
        color,
        fontWeight: weight,
        fontFamily: old ? serif : sans,
      }),
    }}
  >
    {children}
  </div>
);

const Code: React.FC<{
  lines: string[];
  x?: number;
  y?: number;
  width?: number;
  active?: number;
  dark?: boolean;
}> = ({ lines, x = 140, y = 620, width = 1180, active = 0, dark = false }) => (
  <div
    style={{
      ...position(x, y),
      width,
      padding: "26px 34px",
      borderRadius: 16,
      background: dark ? "#203c3d" : "#e9e8e0",
      border: `1px solid ${dark ? "#39514c" : "#dadcd1"}`,
    }}
  >
    {lines.map((line, i) => (
      <div
        key={i}
        style={{
          fontFamily: mono,
          fontSize: 35,
          lineHeight: 1.65,
          letterSpacing: -0.7,
          color: dark ? "#e7eee4" : C.ink,
          background:
            i === active ? (dark ? "#345a51" : "#d6e0d2") : "transparent",
          borderRadius: 5,
          padding: "0 12px",
          whiteSpace: "pre",
        }}
      >
        {line}
      </div>
    ))}
  </div>
);

const Note: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <div
    style={{
      ...position(120, 825),
      fontFamily: sans,
      fontSize: 24,
      lineHeight: 1.5,
      color: dark ? "#9aaea6" : C.soft,
      maxWidth: 1670,
    }}
  >
    {children}
  </div>
);

const Kicker: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <div
    style={{
      ...position(125, 92),
      fontFamily: mono,
      fontSize: 27,
      letterSpacing: 4,
      color: dark ? "#a5c5b7" : C.rust,
    }}
  >
    {children}
  </div>
);

const Grid: React.FC<{
  x: number;
  y: number;
  size?: number;
  count?: number;
  mode?: "color" | "unknown" | "zero";
  fade?: number;
  from?: number;
  tailAt?: number;
  paintAt?: number;
}> = ({
  x,
  y,
  size = 74,
  count = 16,
  mode = "color",
  fade = 1,
  from = 0,
  tailAt,
  paintAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        ...position(x, y),
        width: 4 * (size + 10),
        height: Math.ceil(count / 4) * (size + 10),
        opacity: fade,
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const start =
          tailAt !== undefined && i >= 8
            ? tailAt + (i - 8) * 0.09 * fps
            : from + i * 0.025 * fps;
        const paint =
          paintAt === undefined
            ? mode === "color"
              ? 1
              : 0
            : interpolate(
                frame,
                [paintAt + i * 0.18 * fps, paintAt + (0.35 + i * 0.18) * fps],
                [0, 1],
                clamp,
              );
        const unpainted = paintAt !== undefined && paint < 0.6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i % 4) * (size + 10),
              top: Math.floor(i / 4) * (size + 10),
              width: size,
              height: size,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: mono,
              fontSize: 32,
              color: C.soft,
              background:
                unpainted || (mode === "unknown" && paintAt === undefined)
                  ? "#e1e6df"
                  : mode === "zero"
                    ? "#dce8db"
                    : heart[i]
                      ? "#c9664d"
                      : "#e8dfd1",
              boxShadow:
                paint > 0.6 && heart[i] ? "0 6px 14px #713f2820" : "none",
              opacity: interpolate(
                frame,
                [start, start + 0.5 * fps],
                [0, 1],
                clamp,
              ),
              scale: interpolate(frame, [start, start + 0.6 * fps], [0.78, 1], {
                ...clamp,
                output: "perceptual-scale",
              }),
            }}
          >
            {unpainted || (mode === "unknown" && paintAt === undefined)
              ? "?"
              : mode === "zero"
                ? "0"
                : ""}
          </div>
        );
      })}
    </div>
  );
};

const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
  progress?: number;
}> = ({ x1, y1, x2, y2, color = C.mint, dashed = false, progress = 1 }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const endX = x1 + (x2 - x1) * progress,
    endY = y1 + (y2 - y1) * progress;
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: 1920,
        height: 1080,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <path
        d={`M${x1} ${y1} L${endX} ${endY}`}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={dashed ? "8 10" : undefined}
      />
      <path
        d={`M${endX - 20 * Math.cos(angle - 0.42)} ${endY - 20 * Math.sin(angle - 0.42)} L${endX} ${endY} L${endX - 20 * Math.cos(angle + 0.42)} ${endY - 20 * Math.sin(angle + 0.42)}`}
        stroke={color}
        strokeWidth={4}
        fill="none"
      />
    </svg>
  );
};

export const SceneArt: React.FC<{ kind: Kind; duration: number }> = ({
  kind,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const u = frame / (duration * fps);
  const dark = kind === "inside" || kind === "resize" || kind === "release";
  const enter = interpolate(frame, [0, 0.65 * fps], [0, 1], clamp);
  const ink = dark ? C.white : C.ink;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: dark ? C.dark : C.paper,
        color: ink,
        fontFamily: sans,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          left: 900,
          top: -240,
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle,#31534855 0%,transparent 68%)"
            : "radial-gradient(circle,#e4ddce88 0%,transparent 68%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], clamp),
          translate: interpolate(
            frame,
            [0, 0.8 * fps],
            ["0px 22px", "0px 0px"],
            clamp,
          ),
        }}
      >
        {kind === "opening" && (
          <>
            <Kicker>THE LIFE OF A MEMORY BLOCK</Kicker>
            <div
              style={{
                ...position(120, 215),
                fontFamily: serif,
                fontSize: 218,
                fontStyle: "italic",
                letterSpacing: -11,
                color: C.rust,
                opacity: enter,
              }}
            >
              malloc
            </div>
            <Word x={129} y={501} size={77} weight={600}>
              一张会长大的像素画
            </Word>
            <Word x={134} y={632} size={46} color={C.soft}>
              空间变大以后，地址还在原地吗？
            </Word>
            <div
              style={{
                position: "absolute",
                inset: 0,
                translate: interpolate(
                  frame,
                  [0, 2.5 * fps],
                  ["-190px 20px", "0px 0px"],
                  clamp,
                ),
                scale: interpolate(frame, [0, 2.5 * fps], [1.16, 1], {
                  ...clamp,
                  output: "perceptual-scale",
                }),
              }}
            >
              <Grid x={1210} y={290} size={95} count={16} tailAt={2 * fps} />
            </div>
            <Word x={1257} y={755} size={38} color={C.rust}>
              8 pixels → 16 pixels
            </Word>
            <Note>像素数组贯穿申请、初始化、扩容、失败与释放。</Note>
          </>
        )}
        {kind === "background" && (
          <>
            <Kicker>01 / WHY DYNAMIC MEMORY</Kicker>
            <Word x={125} y={220} size={118} weight={600}>
              有些大小，
              <br />
              运行时才知道。
            </Word>
            {u < 0.48 ? (
              <>
                <Word x={1110} y={240} size={44} color={C.soft}>
                  用户输入 / 图片大小 / 对象寿命
                </Word>
                {Array.from({ length: 9 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      ...position(
                        1120 + (i % 3) * 165,
                        365 + Math.floor(i / 3) * 125,
                      ),
                      width: 132,
                      height: 93,
                      borderRadius: 9,
                      background: i < 3 ? C.mint : "#a8b9a7",
                      opacity: interpolate(
                        frame,
                        [fps * (0.8 + i * 0.35), fps * (1.4 + i * 0.35)],
                        [0, 1],
                        clamp,
                      ),
                      translate: interpolate(
                        frame,
                        [fps * (0.8 + i * 0.35), fps * (1.4 + i * 0.35)],
                        ["0px 30px", "0px 0px"],
                        clamp,
                      ),
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                <div
                  style={{
                    ...position(1040, 250),
                    height: 490,
                    borderLeft: "2px solid #cad2c4",
                  }}
                />
                {[
                  "早期 Unix · 已有分配器",
                  "1987 · Doug Lea 开始编写",
                  "标准 C · 规定接口语义",
                  "今天 · 不同库持续演进",
                ].map((s, i) => (
                  <div
                    key={s}
                    style={{
                      ...position(1080, 260 + i * 125),
                      ...txt(42, { color: i === 2 ? C.rust : C.ink }),
                      opacity: interpolate(
                        frame,
                        [
                          (duration * 0.46 + i * 0.35) * fps,
                          (duration * 0.49 + i * 0.35) * fps,
                        ],
                        [0, 1],
                        clamp,
                      ),
                    }}
                  >
                    {s}
                  </div>
                ))}
              </>
            )}
            <Note>接口稳定，不代表实现、缓存或分配策略固定不变。</Note>
          </>
        )}
        {kind === "contract" && (
          <>
            <Kicker>02 / THE CONTRACT</Kicker>
            <Word x={120} y={208} size={112} weight={600}>
              申请空间，
              <br />
              也接下责任。
            </Word>
            <div
              style={{
                ...position(1030, 225),
                fontFamily: serif,
                fontSize: 93,
                color: C.rust,
              }}
            >
              malloc(size)
            </div>
            {["满足大小与基本对齐", "失败返回 NULL", "原始内容未初始化"].map(
              (s, i) => (
                <div
                  key={s}
                  style={{
                    ...position(1050, 405 + i * 102),
                    ...txt(46),
                    color:
                      i === Math.min(2, Math.floor(u * 3)) ? C.rust : C.soft,
                    borderBottom: "1px solid #d7d9cf",
                    paddingBottom: 22,
                    width: 620,
                  }}
                >
                  {s}
                </div>
              ),
            )}
            <Note>
              讨论非零大小申请。申请、初始化、边界与释放责任需要分别考虑。
            </Note>
          </>
        )}
        {kind === "inside" && (
          <>
            <Kicker dark>03 / INSIDE THE ALLOCATOR</Kicker>
            <Word x={125} y={205} size={103} weight={600} color={C.white}>
              先复用。
              <br />
              再考虑找系统。
            </Word>
            <div
              style={{
                ...position(1000, 226),
                width: 740,
                height: 445,
                border: "1px solid #4d6f63",
                borderRadius: 22,
                padding: 42,
              }}
            >
              <div
                style={{ ...txt(46, { color: "#d3e5d4" }), marginBottom: 50 }}
              >
                C 库分配器
              </div>
              <div style={{ display: "flex", height: 112, gap: 8 }}>
                <div
                  style={{
                    width: interpolate(
                      frame,
                      [duration * 0.43 * fps, (duration * 0.43 + 0.65) * fps],
                      [250, 180],
                      clamp,
                    ),
                    background: u < 0.43 ? "#749380" : C.rust,
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: mono,
                    fontSize: 34,
                  }}
                >
                  {u < 0.43 ? "32 B" : "24 B"}
                </div>
                {u >= 0.43 && (
                  <div
                    style={{
                      width: interpolate(
                        frame,
                        [duration * 0.43 * fps, (duration * 0.43 + 0.65) * fps],
                        [0, 62],
                        clamp,
                      ),
                      opacity: interpolate(
                        frame,
                        [duration * 0.43 * fps, (duration * 0.43 + 0.65) * fps],
                        [0, 1],
                        clamp,
                      ),
                      background: "#749380",
                      borderRadius: 7,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 25,
                      whiteSpace: "nowrap",
                    }}
                  >
                    8 B
                  </div>
                )}
                <div
                  style={{ width: 112, background: "#415958", borderRadius: 7 }}
                />
                <div
                  style={{ width: 190, background: "#749380", borderRadius: 7 }}
                />
              </div>
              <div style={{ ...txt(31, { color: "#a4baaa" }), marginTop: 40 }}>
                缓存 / 空闲块 / 管理元数据
              </div>
            </div>
            <Word x={1075} y={760} size={47} color={"#a5b8aa"}>
              操作系统 · brk / mmap 等
            </Word>
            <Arrow
              x1={1380}
              y1={690}
              x2={1380}
              y2={740}
              color={"#9cb8a5"}
              progress={interpolate(
                frame,
                [duration * 0.5 * fps, duration * 0.53 * fps],
                [0, 1],
                clamp,
              )}
            />
            <Note dark>
              以常见 glibc 为例。示意图忽略对齐、元数据尺寸和并发细节。
            </Note>
          </>
        )}
        {kind === "virtual" && (
          <>
            <Kicker>04 / VIRTUAL ≠ PHYSICAL</Kicker>
            <Word x={125} y={192} size={100} weight={600}>
              连续的是虚拟地址。
            </Word>
            <Word x={186} y={380} size={42} color={C.soft}>
              进程看到的地址
            </Word>
            <Word x={1260} y={380} size={42} color={C.soft}>
              物理页
            </Word>
            {[0, 1, 2, 3].map((n) => (
              <React.Fragment key={n}>
                <div
                  style={{
                    ...position(190, 468 + n * 77),
                    width: 360,
                    height: 56,
                    borderRadius: 6,
                    background: "#d4dfd0",
                    padding: "6px 26px",
                    fontSize: 31,
                  }}
                >
                  虚拟页 {n}
                </div>
                <Arrow
                  x1={570}
                  y1={495 + n * 77}
                  x2={1250}
                  y2={460 + [3, 1, 4, 0][n] * 65}
                  color={["#b87955", "#537e70", "#9d9a6c", "#6b8d9a"][n]}
                  progress={interpolate(
                    frame,
                    [(0.5 + n * 0.2) * fps, (1.4 + n * 0.2) * fps],
                    [0, 1],
                    clamp,
                  )}
                />
              </React.Fragment>
            ))}
            {[0, 1, 2, 3, 4].map((n) => (
              <div
                key={n}
                style={{
                  ...position(1270, 433 + n * 65),
                  width: 330,
                  height: 52,
                  background: "#e5e5da",
                  borderRadius: 6,
                  padding: "7px 25px",
                  fontSize: 28,
                }}
              >
                物理页 {n}
              </div>
            ))}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              {[0, 1, 2, 3].map((n) => {
                const phase = (frame / (3.6 * fps)) % 1;
                const active = Math.floor(frame / (3.6 * fps)) % 4 === n;
                return active && frame > 3 * fps ? (
                  <circle
                    key={n}
                    cx={interpolate(phase, [0, 1], [570, 1250])}
                    cy={interpolate(
                      phase,
                      [0, 1],
                      [495 + n * 77, 460 + [3, 1, 4, 0][n] * 65],
                    )}
                    r={8}
                    fill={C.rust}
                    opacity={interpolate(
                      phase,
                      [0, 0.1, 0.85, 1],
                      [0, 1, 1, 0],
                    )}
                  />
                ) : null;
              })}
            </svg>
            <Note>
              映射关系为示意。Linux
              可能按需建立物理页，申请成功不代表物理内存已全部到位。
            </Note>
          </>
        )}
        {kind === "allocate" && (
          <>
            <Kicker>05 / A SMALL CANVAS</Kicker>
            <Word x={120} y={198} size={102} weight={600}>
              8 格画布，
              <br />
              32 字节。
            </Word>
            <Grid x={1240} y={292} size={92} count={8} mode="unknown" />
            <Word x={1274} y={555} size={43} color={C.rust}>
              p → 0x1000
            </Word>
            <Code
              lines={[
                "p = malloc(n * sizeof *p);",
                "if (p == NULL) { /* 处理失败 */ }",
              ]}
              x={125}
              y={595}
              width={1000}
              active={u > 0.5 ? 1 : 0}
            />
            <Note>
              本例 uint32_t 像素占 4 字节。乘法须防溢出；地址为虚构示意。
            </Note>
          </>
        )}
        {kind === "initialize" && (
          <>
            <Kicker>06 / WRITE BEFORE READING</Kicker>
            <Word x={122} y={196} size={105} weight={600}>
              空格子，先上色。
            </Word>
            <Grid
              x={200}
              y={426}
              size={90}
              count={8}
              mode="color"
              paintAt={duration * 0.36 * fps}
            />
            <Grid
              x={1200}
              y={426}
              size={90}
              count={8}
              mode="zero"
              from={duration * 0.56 * fps}
            />
            <div
              style={{
                ...position(949, 413),
                width: 2,
                height: 270,
                background: "#d1d7ca",
              }}
            />
            <Word x={221} y={701} size={44}>
              malloc 后逐个写入
            </Word>
            <Word x={1198} y={701} size={44}>
              calloc 全部字节置零
            </Word>
            <Note>
              calloc
              的全零字节不等价于所有类型的零值表示；两种申请都需要检查失败。
            </Note>
          </>
        )}
        {kind === "resize" && (
          <>
            <Kicker dark>07 / REALLOC · THE MOVE</Kicker>
            <Word x={122} y={193} size={103} weight={600} color={C.white}>
              长大，可能要搬家。
            </Word>
            <Word x={183} y={370} size={38} color={"#9cb3a6"}>
              原对象 · 32 B
            </Word>
            <Word x={1270} y={370} size={38} color={"#9cb3a6"}>
              新对象 · 64 B
            </Word>
            <Grid x={165} y={445} size={69} count={8} mode="unknown" />
            <Grid x={1260} y={445} size={69} count={16} mode="unknown" />
            {Array.from({ length: 8 }, (_, n) => {
              const i = n + 8;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 1260 + (i % 4) * 79,
                    top: 445 + Math.floor(i / 4) * 79,
                    width: 69,
                    height: 69,
                    borderRadius: 8,
                    background: heart[i] ? C.rust : "#ddd5c4",
                    opacity: interpolate(
                      frame,
                      [
                        (duration * 0.8 + n * 0.07) * fps,
                        (duration * 0.8 + 0.35 + n * 0.07) * fps,
                      ],
                      [0, 1],
                      clamp,
                    ),
                  }}
                />
              );
            })}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 165 + (i % 4) * 79,
                  top: 445 + Math.floor(i / 4) * 79,
                  width: 69,
                  height: 69,
                  borderRadius: 8,
                  background: heart[i] ? C.rust : "#ddd5c4",
                  translate: interpolate(
                    frame,
                    [
                      (duration * 0.22 + i * 0.045) * fps,
                      (duration * 0.54 + i * 0.045) * fps,
                    ],
                    ["0px 0px", "1095px 0px"],
                    clamp,
                  ),
                  scale: interpolate(
                    frame,
                    [
                      (duration * 0.22 + i * 0.045) * fps,
                      (duration * 0.35 + i * 0.045) * fps,
                      (duration * 0.54 + i * 0.045) * fps,
                    ],
                    [1, 1.14, 1],
                    { ...clamp, output: "perceptual-scale" },
                  ),
                }}
              />
            ))}
            {u > 0.65 ? (
              <>
                <Word x={177} y={692} size={40} color={"#799087"}>
                  旧对象失效
                </Word>
                <Word x={670} y={738} size={40} color={"#d9e1d2"}>
                  成功返回后：p = tmp
                </Word>
              </>
            ) : (
              <Arrow
                x1={650}
                y1={528}
                x2={1120}
                y2={528}
                color={"#d3b893"}
                progress={interpolate(frame, [2 * fps, 3 * fps], [0, 1], clamp)}
              />
            )}
            {u > 0.8 && (
              <Word x={1220} y={777} size={28} color={"#a4baaa"}>
                新增格子：先写入，再读取
              </Word>
            )}
            <Note dark>
              只展示搬迁这一可能路径。realloc
              也可能原地完成；新增区域仍须初始化。
            </Note>
          </>
        )}
        {kind === "failure" && (
          <>
            <Kicker>08 / KEEP THE ORIGINAL</Kicker>
            <Word x={122} y={195} size={107} weight={600}>
              没扩成，
              <br />
              原画还在。
            </Word>
            <Grid x={1280} y={292} size={89} count={8} />
            <div
              style={{
                ...position(1265, 581),
                ...txt(56, { color: C.rust, fontFamily: mono }),
                padding: "16px 30px",
                border: "2px solid #c18d74",
                borderRadius: 12,
              }}
            >
              tmp = NULL
            </div>
            <Code
              lines={[
                "tmp = realloc(p, new_n * sizeof *p);",
                "if (tmp != NULL) p = tmp;",
                "else { /* p 仍然拥有原块 */ }",
              ]}
              x={125}
              y={594}
              width={1040}
              active={u > 0.38 ? 2 : 0}
            />
            <Note>
              非零请求失败时原对象仍有效。先使用临时指针，避免丢失原块的唯一引用。
            </Note>
          </>
        )}
        {kind === "release" && (
          <>
            <Kicker dark>09 / RETURN OWNERSHIP</Kicker>
            <Word x={123} y={195} size={112} weight={600} color={C.white}>
              归还使用权。
              <br />
              不是擦除内容。
            </Word>
            <Grid x={1250} y={300} size={86} fade={u < 0.45 ? 1 : 0.3} />
            {u > 0.45 && (
              <div
                style={{
                  ...position(1214, 427),
                  width: 445,
                  height: 100,
                  ...txt(60, {
                    color: "#e8b697",
                    fontWeight: 600,
                    textAlign: "center",
                  }),
                  background: "#142a2ce8",
                  borderTop: "2px solid #b68565",
                  borderBottom: "2px solid #b68565",
                }}
              >
                禁止再读写
              </div>
            )}
            <Code
              lines={["free(p);", "p = NULL;"]}
              x={125}
              y={602}
              width={930}
              active={u < 0.55 ? 0 : 1}
              dark
            />
            {u > 0.7 && (
              <Word x={1220} y={747} size={33} color={"#e8b697"}>
                别名 q 仍悬空，不能继续使用
              </Word>
            )}
            <Note dark>
              free
              不承诺清零或立即归还操作系统；置空一个指针不能修复其他悬空别名。
            </Note>
          </>
        )}
        {kind === "mistakes" && (
          <>
            <Kicker>10 / WHO OWNS THIS BLOCK?</Kicker>
            <Word x={124} y={202} size={105} weight={600}>
              问题常出在所有权。
            </Word>
            {["内存泄漏", "释放后访问", "重复释放"].map((s, i) => (
              <div
                key={s}
                style={{
                  ...position(155 + i * 585, 436),
                  width: 510,
                  borderTop: `3px solid ${i === Math.min(2, Math.floor(u * 3)) ? C.rust : "#cbd1c7"}`,
                  paddingTop: 35,
                  opacity: i === Math.min(2, Math.floor(u * 3)) ? 1 : 0.28,
                }}
              >
                <div
                  style={{
                    fontFamily: serif,
                    fontSize: 78,
                    color: C.rust,
                    fontStyle: "italic",
                  }}
                >
                  0{i + 1}
                </div>
                <div style={{ ...txt(61, { fontWeight: 600 }), marginTop: 35 }}>
                  {s}
                </div>
                <div style={{ ...txt(34, { color: C.soft }), marginTop: 24 }}>
                  {
                    [
                      "所有引用丢失",
                      "访问已经失效的对象",
                      "同一块空间归还两次",
                    ][i]
                  }
                </div>
              </div>
            ))}
            <Note>图中仅呈现错误关系，不执行未定义行为代码。</Note>
          </>
        )}
        {kind === "fragment" && (
          <>
            <Kicker>11 / FRAGMENTATION</Kicker>
            <Word x={125} y={190} size={108} weight={600}>
              总量够，
              <br />
              不一定放得下。
            </Word>
            <Word x={1050} y={257} size={70} color={C.rust}>
              需要连续的 48 B
            </Word>
            <Word x={1056} y={374} size={39} color={C.soft}>
              {u < 0.56
                ? "空闲总量：32 + 32 = 64 B"
                : "释放中间块：总空闲变为 80 B"}
            </Word>
            <div
              style={{
                ...position(180, 585),
                display: "flex",
                gap: u < 0.56 ? 12 : 0,
                height: 140,
              }}
            >
              <div
                style={{
                  width: 620,
                  background: "#b7cbb6",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 49,
                }}
              >
                空闲 32 B
              </div>
              <div
                style={{
                  width: 300,
                  background: u < 0.56 ? C.mint : "#b7cbb6",
                  borderRadius: u < 0.56 ? 9 : 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  color: u < 0.56 ? C.white : C.ink,
                }}
              >
                {u < 0.56 ? "占用 16 B" : "已释放"}
              </div>
              <div
                style={{
                  width: 620,
                  background: "#b7cbb6",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 49,
                }}
              >
                空闲 32 B
              </div>
            </div>
            {u > 0.63 && (
              <div
                style={{
                  ...position(180, 585),
                  height: 140,
                  width: interpolate(
                    frame,
                    [duration * 0.63 * fps, duration * 0.69 * fps],
                    [0, 924],
                    clamp,
                  ),
                  background: C.rust,
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  fontSize: 53,
                  color: C.white,
                }}
              >
                合并以后，48 B 可以放入
              </div>
            )}
            <Note>
              受限区域示意，忽略对齐与元数据。实际分配器还可能向操作系统扩展。
            </Note>
          </>
        )}
        {kind === "practice" && (
          <>
            <Kicker>12 / A COMPLETE PATH</Kicker>
            <Word x={124} y={199} size={105} weight={600}>
              把责任接起来。
            </Word>
            {[
              "防溢出",
              "申请与判空",
              "初始化与边界",
              "扩容保留原块",
              "统一释放",
            ].map((s, i) => (
              <div
                key={s}
                style={{
                  ...position(127 + i * 347, 455),
                  width: 315,
                  opacity: interpolate(
                    frame,
                    [(0.7 + i * 0.3) * fps, (1.3 + i * 0.3) * fps],
                    [0, 1],
                    clamp,
                  ),
                }}
              >
                <div
                  style={{
                    fontFamily: serif,
                    fontSize: 83,
                    color: C.rust,
                    marginBottom: 35,
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    ...txt(43, {
                      fontWeight: 600,
                      color:
                        i === Math.min(4, Math.floor(u * 5)) ? C.rust : C.ink,
                    }),
                    borderTop: `2px solid ${i === Math.min(4, Math.floor(u * 5)) ? C.rust : "#bdcbbb"}`,
                    paddingTop: 34,
                    minHeight: 115,
                  }}
                >
                  {s}
                </div>
              </div>
            ))}
            <Word x={132} y={750} size={41} color={C.soft}>
              成功路径和失败路径，都要能说明谁拥有这块空间。
            </Word>
            <Note>
              随附 C11 最小示例检查大小、内容保留、新区域初始化及最终释放。
            </Note>
          </>
        )}
        {kind === "tradeoff" && (
          <>
            <Kicker>13 / EMBEDDED LINUX</Kicker>
            <Word x={125} y={197} size={103} weight={600}>
              灵活，也有管理成本。
            </Word>
            <Word x={190} y={436} size={70} color={C.rust}>
              动态分配
            </Word>
            <Word x={1090} y={436} size={70} color={C.mint}>
              预分配 / 内存池
            </Word>
            <Word x={195} y={570} size={43} color={C.soft}>
              容量与寿命灵活
              <br />
              需要管理失败、碎片与同步
            </Word>
            <Word x={1096} y={570} size={43} color={C.soft}>
              资源先规划
              <br />
              结合对象寿命与时序要求评估
            </Word>
            <Note>本片未测量真实设备延迟，也不据此宣称硬实时达标。</Note>
          </>
        )}
        {kind === "closing" && (
          <>
            <Kicker>THE LIFE OF A MEMORY BLOCK</Kicker>
            <Word x={125} y={221} size={112} weight={600}>
              申请有依据。
              <br />
              使用有边界。
              <br />
              释放有归属。
            </Word>
            <Grid x={1250} y={260} size={92} />
            <Word x={1254} y={739} size={42} color={C.rust}>
              管理对象的一生。
            </Word>
            <Note>
              参考：C11 N1570 §7.22.3、Linux man-pages、GNU C Library 手册、Doug
              Lea 作者文章。
            </Note>
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 883,
          height: 2,
          background: dark ? "#426154" : "#d4d9ce",
        }}
      >
        <div
          style={{
            height: 2,
            width: `${Math.min(1, u) * 100}%`,
            background: dark ? "#b9cdb9" : C.rust,
          }}
        />
      </div>
    </div>
  );
};
