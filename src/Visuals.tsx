import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import cueSheet from "./visual-cues.json";
import { C, CaseBadge, sans, smooth } from "./visual-kit";
import { OpeningScene, HistoryScene, ContractScene } from "./StoryScenes";
import {
  InsideScene,
  VirtualScene,
  AllocateScene,
  InitializeScene,
} from "./MemoryScenes";
import {
  ResizeScene,
  FailureScene,
  ReleaseScene,
  MistakesScene,
} from "./LifecycleScenes";
import {
  FragmentScene,
  PracticeScene,
  TradeoffScene,
  ClosingScene,
} from "./FinalScenes";

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
const cues: Record<Kind, Record<string, number>> = cueSheet;
const states: Record<Kind, string> = {
  opening: "扩容预告",
  background: "为什么需要空间",
  contract: "接口与责任",
  inside: "申请 32 B",
  virtual: "跨页原理示意",
  allocate: "申请 8 格",
  initialize: "写入颜色",
  resize: "成功分支",
  failure: "失败 · 保留 8 格",
  release: "结束使用",
  mistakes: "三种错误",
  fragment: "连续空间与碎片",
  practice: "回顾完整路径",
  tradeoff: "资源与时序预算",
  closing: "对象的一生",
};

export const SceneArt: React.FC<{ kind: Kind; duration: number }> = ({
  kind,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = (name: string) => {
    const seconds = cues[kind][name];
    if (typeof seconds !== "number")
      throw new Error(`Missing animation cue: ${kind}/${name}`);
    return seconds * fps;
  };
  const timing = { frame, fps, at };
  const count =
    [
      "resize",
      "release",
      "mistakes",
      "fragment",
      "practice",
      "tradeoff",
      "closing",
    ].indexOf(kind) >= 0
      ? 16
      : 8;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: C.paper,
        color: C.ink,
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
          background: "radial-gradient(circle,#e4ddce88 0%,transparent 68%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], smooth),
          translate: interpolate(
            frame,
            [0, 0.5 * fps],
            ["0px 13px", "0px 0px"],
            smooth,
          ),
        }}
      >
        <CaseBadge
          state={states[kind]}
          count={count}
          muted={kind === "release" && frame >= at("free")}
        />
        {kind === "opening" && <OpeningScene {...timing} />}
        {kind === "background" && <HistoryScene {...timing} />}
        {kind === "contract" && <ContractScene {...timing} />}
        {kind === "inside" && <InsideScene {...timing} />}
        {kind === "virtual" && <VirtualScene {...timing} />}
        {kind === "allocate" && <AllocateScene {...timing} />}
        {kind === "initialize" && <InitializeScene {...timing} />}
        {kind === "resize" && <ResizeScene {...timing} />}
        {kind === "failure" && <FailureScene {...timing} />}
        {kind === "release" && <ReleaseScene {...timing} />}
        {kind === "mistakes" && <MistakesScene {...timing} />}
        {kind === "fragment" && <FragmentScene {...timing} />}
        {kind === "practice" && <PracticeScene {...timing} />}
        {kind === "tradeoff" && <TradeoffScene {...timing} />}
        {kind === "closing" && <ClosingScene {...timing} />}
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 925,
          height: 2,
          background: "#d4d9ce",
        }}
      >
        <div
          style={{
            height: 2,
            width: `${Math.min(1, frame / (duration * fps)) * 100}%`,
            background: C.rust,
          }}
        />
      </div>
    </div>
  );
};
