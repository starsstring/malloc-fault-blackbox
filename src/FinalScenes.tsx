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
  pos,
  smooth,
  sans,
  serif,
} from "./visual-kit";

export const FragmentScene: React.FC<SceneTiming> = ({ frame, fps, at }) => (
  <>
    <Kicker>11 / FRAGMENTATION · FIND ONE CONTIGUOUS RANGE</Kicker>
    <Title>
      总量够，
      <br />
      不一定放得下。
    </Title>
    <Text x={1060} y={260} size={67} color={C.rust}>
      需要连续的 48 B
    </Text>
    <Text x={1065} y={365} size={38} color={C.soft}>
      {frame < at("release")
        ? "空闲总量：32 + 32 = 64 B"
        : "释放中间块：总空闲变为 80 B"}
    </Text>
    <div
      style={{
        ...pos(180, 560),
        display: "flex",
        gap: frame < at("release") ? 10 : 0,
        height: 140,
      }}
    >
      {[
        ["空闲 32 B", 624],
        ["占用 16 B", 312],
        ["空闲 32 B", 624],
      ].map(([text, width], i) => (
        <div
          key={text + String(i)}
          style={{
            width: Number(width),
            height: 140,
            background: i === 1 && frame < at("release") ? C.mint : "#b7cbb6",
            borderRadius: frame < at("release") ? 9 : 0,
            display: "grid",
            placeItems: "center",
            fontFamily: sans,
            fontSize: i === 1 ? 38 : 48,
            color: i === 1 && frame < at("release") ? C.white : C.ink,
          }}
        >
          {i === 1 && frame >= at("release") ? "已释放" : text}
        </div>
      ))}
    </div>
    {frame >= at("request") && frame < at("release") && (
      <Pill x={1040} y={448} size={33}>
        任一空闲块都不足 48 B
      </Pill>
    )}
    {frame >= at("merge") && (
      <div
        style={{
          ...pos(180, 560),
          height: 140,
          width: interpolate(
            frame,
            [at("merge"), at("merge") + 0.85 * fps],
            [0, 936],
            smooth,
          ),
          borderRadius: 9,
          background: C.rust,
          display: "grid",
          placeItems: "center",
          fontFamily: sans,
          fontSize: 49,
          color: C.white,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        合并以后，48 B 可以放入
      </div>
    )}
    {frame >= at("extend") && (
      <Text x={185} y={739} size={38} color={C.mint}>
        真实分配器还可能向系统扩展空间。
      </Text>
    )}
    <Note>
      受限区域示意，忽略对齐和元数据；不能据此断言实际 malloc 一定失败。
    </Note>
  </>
);

export const PracticeScene: React.FC<SceneTiming> = ({ frame, at }) => {
  const cues = ["overflow", "check", "initialize", "resize", "free"];
  const active = Math.max(0, cues.filter((c) => frame >= at(c)).length - 1);
  return (
    <>
      <Kicker>12 / A COMPLETE LIFECYCLE</Kicker>
      <Title>把小画的一生连起来。</Title>
      {[
        "防溢出",
        "申请与判空",
        "初始化与边界",
        "扩容保留原块",
        "恰好释放一次",
      ].map((name, i) => (
        <div key={name} style={{ ...pos(125 + i * 345, 405), width: 312 }}>
          <div
            style={{
              fontFamily: serif,
              fontSize: 79,
              color: i === active ? C.rust : C.soft,
            }}
          >
            0{i + 1}
          </div>
          <div
            style={{
              marginTop: 25,
              paddingTop: 27,
              borderTop: `4px solid ${i <= active ? C.rust : "#ccd4c5"}`,
              fontFamily: sans,
              fontSize: 42,
              fontWeight: 600,
              color: i === active ? C.rust : C.ink,
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </div>
        </div>
      ))}
      <Code
        x={140}
        y={650}
        width={1550}
        size={37}
        active={0}
        lines={[
          [
            "n <= SIZE_MAX / sizeof *p",
            "p = malloc(...);  if (!p) ...",
            "先写入颜色，再在边界内读取",
            "tmp = realloc(...);  成功后再更新 p",
            "free(p);  p = NULL;",
          ][active],
        ]}
      />
      <Note>每个成功与失败分支，都要能说清：现在谁拥有这块空间？</Note>
    </>
  );
};

export const TradeoffScene: React.FC<SceneTiming> = ({ frame, fps, at }) => (
  <>
    <Kicker>13 / EMBEDDED LINUX · PLAN THE BUDGET</Kicker>
    <Title>灵活，也有管理成本。</Title>
    {[
      ["动态分配", "容量与寿命灵活", "管理失败、碎片与同步", C.rust],
      ["预分配 / 内存池", "资源先规划", "结合对象寿命与时序评估", C.mint],
    ].map(([name, a, b, color], i) => (
      <div
        key={name}
        style={{
          ...pos(150 + i * 890, 400),
          width: 780,
          height: 320,
          border: `2px solid ${color}`,
          borderRadius: 15,
          padding: "27px 32px",
          boxSizing: "border-box",
          opacity:
            i === 0
              ? 1
              : interpolate(
                  frame,
                  [at("pool"), at("pool") + 0.5 * fps],
                  [0.35, 1],
                  smooth,
                ),
        }}
      >
        <div style={{ fontFamily: sans, fontSize: 63, color }}>{name}</div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 37,
            lineHeight: 1.6,
            color: C.soft,
            marginTop: 32,
          }}
        >
          {a}
          <br />
          {b}
        </div>
      </div>
    ))}
    {frame >= at("evaluate") && (
      <Text x={160} y={751} size={37} color={C.ink}>
        根据对象寿命、资源预算与时序要求选择。
      </Text>
    )}
    <Note>此处讨论设计取舍，没有测量开发板延迟，也不据此宣称硬实时达标。</Note>
  </>
);

export const ClosingScene: React.FC<SceneTiming> = ({ frame, fps, at }) => (
  <>
    <Kicker>THE LIFE OF A MEMORY BLOCK</Kicker>
    <Title size={107}>
      申请有依据。
      <br />
      使用有边界。
      <br />
      释放有归属。
    </Title>
    <Pixels
      x={1280}
      y={277}
      count={16}
      size={82}
      opacity={interpolate(
        frame,
        [at("free"), at("free") + 0.7 * fps],
        [1, 0.22],
        smooth,
      )}
    />
    {frame >= at("free") ? (
      <Pill x={1290} y={459} size={47}>
        已归还
      </Pill>
    ) : (
      <Text x={1265} y={722} size={39} color={C.rust}>
        成功后，改用返回的新指针。
      </Text>
    )}
    {frame >= at("pointer") && (
      <Text x={135} y={718} size={39} color={C.mint}>
        扩容结果可能不同，所有权始终要清楚。
      </Text>
    )}
    <Note>
      参考：C11 N1570 §7.22.3、Linux man-pages、GNU C Library 手册与 Doug Lea。
    </Note>
  </>
);
