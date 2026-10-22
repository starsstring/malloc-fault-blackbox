import React from "react";
import { interpolate } from "remotion";
import {
  C,
  Code,
  Kicker,
  MovingPixels,
  Note,
  Pixels,
  Pill,
  SceneTiming,
  Text,
  Title,
  Arrow,
  pos,
  serif,
  smooth,
  sans,
} from "./visual-kit";

export const OpeningScene: React.FC<SceneTiming> = ({ frame, fps, at }) => (
  <>
    <Kicker>THE LIFE OF A MEMORY BLOCK</Kicker>
    <div
      style={{
        ...pos(120, 200),
        fontFamily: serif,
        fontSize: 196,
        fontStyle: "italic",
        letterSpacing: -9,
        color: C.rust,
      }}
    >
      malloc
    </div>
    <Text x={125} y={458} size={72} weight={600}>
      一张会长大的像素画
    </Text>
    <Text x={130} y={574} size={43} color={C.soft}>
      空间变大以后，地址还在原地吗？
    </Text>
    <Text x={1040} y={308} size={38} color={C.soft}>
      8 格 · 原位置
    </Text>
    <Text x={1480} y={308} size={38} color={C.rust}>
      16 格 · 新位置？
    </Text>
    <Pixels x={1030} y={410} count={8} size={54} mode="unknown" />
    <Pixels
      x={1470}
      y={410}
      count={16}
      size={54}
      mode="unknown"
      from={at("grow")}
    />
    <MovingPixels
      x1={1030}
      x2={1470}
      y={410}
      size={54}
      start={at("move")}
      end={at("move") + 1.65 * fps}
    />
    <Arrow
      x1={1320}
      y1={490}
      x2={1438}
      y2={490}
      progress={interpolate(
        frame,
        [at("grow"), at("grow") + 0.5 * fps],
        [0, 1],
        smooth,
      )}
    />
    {frame > at("move") && (
      <Pill x={1040} y={692} size={34}>
        可能搬迁，也可能原地完成
      </Pill>
    )}
    {frame > at("journey") && (
      <Text x={130} y={720} size={41} color={C.mint}>
        申请 → 使用 → 扩容 → 释放
      </Text>
    )}
    <Note>
      先看一种可能的扩容结果，再回到接口与机制。地址与移动路径均为示意。
    </Note>
  </>
);

export const HistoryScene: React.FC<SceneTiming> = ({ frame, fps, at }) => {
  const active =
    frame < at("lea")
      ? 0
      : frame < at("standard")
        ? 1
        : frame < at("modern")
          ? 2
          : 3;
  return (
    <>
      <Kicker>01 / A STABLE INTERFACE, EVOLVING ALLOCATORS</Kicker>
      <Title>一个接口，几代实现。</Title>
      {frame < at("unix") ? (
        <>
          <Text x={130} y={405} size={56} color={C.soft}>
            输入多长？图片多大？
          </Text>
          <div
            style={{
              ...pos(135, 530),
              height: 86,
              width: interpolate(
                frame,
                [0.8 * fps, at("runtime")],
                [310, 970],
                smooth,
              ),
              borderRadius: 12,
              background: C.mint,
            }}
          />
          <Text x={140} y={660} size={47}>
            大小在运行时才知道。
          </Text>
        </>
      ) : (
        <>
          <div
            style={{
              ...pos(150, 401),
              width: 1550,
              height: 3,
              background: "#c6d0c1",
            }}
          />
          {[
            ["unix", "早期 Unix", "已有分配器", "运行时管理空间"],
            ["lea", "1987 · dlmalloc", "Doug Lea 开始编写", "权衡速度与空间"],
            ["standard", "C 标准", "规定接口语义", "实现策略交给库"],
            ["modern", "现代 C 库", "复用、缓存、并发", "持续优化分配策略"],
          ].map(([cue, title, line1, line2], i) => (
            <div
              key={cue}
              style={{
                ...pos(125 + i * 425, 382),
                width: 378,
                opacity: frame >= at(cue) ? 1 : 0.27,
                translate: interpolate(
                  frame,
                  [at(cue), at(cue) + 0.5 * fps],
                  ["0px 14px", "0px 0px"],
                  smooth,
                ),
              }}
            >
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  background: i === active ? C.rust : C.mint,
                  border: `8px solid ${C.paper}`,
                  boxSizing: "content-box",
                }}
              />
              <div
                style={{
                  fontFamily: sans,
                  fontSize: i === 1 ? 42 : 48,
                  fontWeight: 600,
                  color: i === active ? C.rust : C.ink,
                  marginTop: 35,
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 34,
                  color: C.soft,
                  lineHeight: 1.6,
                  marginTop: 22,
                }}
              >
                {line1}
                <br />
                {line2}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 30 }}>
                {[0, 1, 2, 3].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: 45 + n * 10,
                      height: 28,
                      borderRadius: 4,
                      background: i === active ? C.mint : "#ccd6c7",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          {frame > at("library") && (
            <Pill x={135} y={715} color={C.mint} size={36}>
              标准定义承诺，分配器决定策略。
            </Pill>
          )}
        </>
      )}
      <Note>这条线串起需求、标准与实现；它们不是同一个分配器的逐代版本。</Note>
    </>
  );
};

export const ContractScene: React.FC<SceneTiming> = ({ frame, at }) => {
  const active =
    frame < at("failure") ? 0 : frame < at("responsibility") ? 1 : 2;
  return (
    <>
      <Kicker>02 / THE CONTRACT</Kicker>
      <Title>
        申请空间，
        <br />
        也接下责任。
      </Title>
      <Text x={1030} y={243} size={78} color={C.rust}>
        malloc(size)
      </Text>
      {[
        "满足大小与基本对齐",
        "失败返回 NULL",
        "初始化、边界、释放：你负责",
      ].map((s, i) => (
        <div
          key={s}
          style={{
            ...pos(1010, 418 + i * 113),
            padding: "18px 22px",
            borderLeft: `5px solid ${active === i ? C.rust : "#ced6c7"}`,
            fontFamily: sans,
            fontSize: i === 2 ? 38 : 43,
            color: active === i ? C.ink : C.soft,
            background: active === i ? "#e7e8de" : "transparent",
          }}
        >
          {s}
        </div>
      ))}
      {frame >= at("responsibility") && (
        <Code
          lines={["拿到空间 ≠ 已有有效数据"]}
          x={120}
          y={657}
          width={760}
          size={40}
        />
      )}
      <Note>讨论非零大小请求。基本对齐不等于支持任意过度对齐的类型。</Note>
    </>
  );
};
