import React from "react";
import { interpolate } from "remotion";
import {
  C,
  Code,
  Kicker,
  Note,
  Pixels,
  Pill,
  SceneTiming,
  Text,
  Title,
  Arrow,
  pos,
  smooth,
  sans,
} from "./visual-kit";

export const InsideScene: React.FC<SceneTiming> = ({ frame, fps, at }) => (
  <>
    <Kicker>03 / INSIDE THE ALLOCATOR</Kicker>
    <Title size={97}>
      先找分配器，
      <br />
      再看操作系统。
    </Title>
    <Pill x={140} y={505} size={43}>
      小画申请：32 B
    </Pill>
    <Arrow
      x1={590}
      y1={552}
      x2={980}
      y2={552}
      progress={interpolate(
        frame,
        [at("allocator"), at("allocator") + 0.8 * fps],
        [0, 1],
        smooth,
      )}
    />
    <div
      style={{
        ...pos(1010, 326),
        width: 720,
        height: 331,
        border: "2px solid #c4cfbe",
        borderRadius: 20,
        padding: 34,
      }}
    >
      <div style={{ fontFamily: sans, fontSize: 47, marginBottom: 42 }}>
        C 库分配器
      </div>
      <div style={{ display: "flex", gap: 10, height: 100 }}>
        <div
          style={{
            width: frame < at("split") ? 360 : 175,
            background: frame < at("split") ? C.mint : C.rust,
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
            fontSize: 37,
            color: C.white,
          }}
        >
          {frame < at("split") ? "空闲 64 B" : "小画 32 B"}
        </div>
        {frame >= at("split") && (
          <div
            style={{
              width: 175,
              background: C.pale,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              fontSize: 32,
              opacity: interpolate(
                frame,
                [at("split"), at("split") + 0.45 * fps],
                [0, 1],
                smooth,
              ),
            }}
          >
            余下 32 B
          </div>
        )}
        <div style={{ width: 140, background: "#9fae9c", borderRadius: 8 }} />
      </div>
      <div
        style={{ fontFamily: sans, fontSize: 30, color: C.soft, marginTop: 32 }}
      >
        {frame < at("reuse") ? "查找可用空间" : "先复用缓存与空闲块"}
      </div>
    </div>
    {frame >= at("system") && (
      <>
        <Arrow
          x1={1370}
          y1={678}
          x2={1370}
          y2={727}
          progress={interpolate(
            frame,
            [at("system"), at("system") + 0.45 * fps],
            [0, 1],
            smooth,
          )}
        />
        <Text x={1090} y={744} size={37} color={C.soft}>
          不够时：brk / mmap 等
        </Text>
      </>
    )}
    <Note>
      以常见 glibc 为例。拆分示意忽略对齐与元数据，不代表真实内部布局。
    </Note>
  </>
);

export const VirtualScene: React.FC<SceneTiming> = ({ frame, fps, at }) => (
  <>
    <Kicker>04 / VIRTUAL ≠ PHYSICAL</Kicker>
    <Title size={99}>连续的是虚拟地址。</Title>
    <Text x={170} y={358} size={37} color={C.soft}>
      更大的像素数组跨页时（示意）
    </Text>
    <Text x={1280} y={358} size={37} color={C.soft}>
      物理页可以分散
    </Text>
    {[0, 1, 2, 3].map((n) => (
      <React.Fragment key={n}>
        <div
          style={{
            ...pos(175, 445 + n * 73),
            width: 385,
            height: 57,
            padding: "8px 22px",
            boxSizing: "border-box",
            borderRadius: 7,
            background: C.pale,
            fontSize: 32,
          }}
        >
          连续虚拟页 {n}
        </div>
        <Arrow
          x1={585}
          y1={473 + n * 73}
          x2={1260}
          y2={428 + [3, 1, 4, 0][n] * 63}
          color={[C.rust, C.mint, "#8a7d4b", "#69868b"][n]}
          progress={interpolate(
            frame,
            [
              at("mapping") + n * 0.13 * fps,
              at("mapping") + (0.6 + n * 0.13) * fps,
            ],
            [0, 1],
            smooth,
          )}
        />
      </React.Fragment>
    ))}
    {[0, 1, 2, 3, 4].map((n) => (
      <div
        key={n}
        style={{
          ...pos(1280, 403 + n * 63),
          width: 320,
          height: 50,
          padding: "6px 23px",
          boxSizing: "border-box",
          borderRadius: 7,
          background: "#e1e3d7",
          fontSize: 29,
        }}
      >
        物理页 {n}
      </div>
    ))}
    {frame > at("demand") && (
      <Pill x={1050} y={739} size={31}>
        申请成功 ≠ 物理页已全部到位
      </Pill>
    )}
    <Note>图示更大对象的一般原理；本例 32 字节像素数组不需要跨这么多页。</Note>
  </>
);

export const AllocateScene: React.FC<SceneTiming> = ({ frame, at }) => (
  <>
    <Kicker>05 / REQUEST THE FIRST CANVAS</Kicker>
    <Title>
      8 格画布，
      <br />
      32 字节。
    </Title>
    <Code
      y={525}
      width={1100}
      size={37}
      active={frame < at("request") ? 0 : frame < at("check") ? 1 : 2}
      lines={[
        "if (n > SIZE_MAX / sizeof *p) return;",
        "p = malloc(n * sizeof *p);",
        "if (p == NULL) { /* 处理失败 */ }",
      ]}
    />
    <Pixels
      x={1330}
      y={410}
      count={8}
      size={77}
      mode="unknown"
      from={at("size")}
    />
    {frame >= at("success") ? (
      <Pill x={1300} y={657} color={C.mint} size={35}>
        p → 0x1000
      </Pill>
    ) : (
      <Text x={1300} y={657} size={35} color={C.soft}>
        {frame < at("request") ? "先算大小" : "等待分配结果"}
      </Text>
    )}
    <Note>
      本例 uint32_t 像素占 4 字节。先防乘法溢出，再申请和判空；地址为示意。
    </Note>
  </>
);

export const InitializeScene: React.FC<SceneTiming> = ({ frame, at }) => (
  <>
    <Kicker>06 / WRITE BEFORE READING</Kicker>
    <Title>空格子，先上色。</Title>
    <Pixels
      x={200}
      y={409}
      count={8}
      size={92}
      mode="color"
      paintAt={at("write")}
    />
    <Pixels
      x={1225}
      y={409}
      count={8}
      size={92}
      mode="zero"
      from={at("zero")}
    />
    <div
      style={{ ...pos(955, 397), height: 325, width: 2, background: "#ccd3c5" }}
    />
    <Text x={200} y={652} size={43}>
      malloc 后逐个写入
    </Text>
    <Text x={1225} y={652} size={43}>
      calloc 全部字节置零
    </Text>
    {frame >= at("read") && frame < at("zero") && (
      <Pill x={200} y={725} size={32} color={C.mint}>
        写好以后，才读取
      </Pill>
    )}
    {frame >= at("failure") && (
      <Pill x={1070} y={725} size={32}>
        两种申请都要检查失败
      </Pill>
    )}
    <Note>calloc 清零的是全部字节；这不等价于所有类型的零值表示。</Note>
  </>
);
