import { useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  Opening,
  Background,
  Contract,
  Inside,
  Virtual,
  Allocate,
  Initialize,
  Resize,
  Failure,
  Release,
  Mistakes,
  Fragment,
  Practice,
  Tradeoff,
  Closing,
} from "./Scenes";
export const Movie = () => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries name="Malloc 的一生">
      <TransitionSeries.Sequence
        name="一张会长大的像素画"
        durationInFrames={Math.round((273 / 30) * fps)}
      >
        <Opening name="一张会长大的像素画" durationSeconds={9.1} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="从需求到实现"
        durationInFrames={Math.round((1017 / 30) * fps)}
      >
        <Background name="从需求到实现" durationSeconds={33.9} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="先认清它的承诺"
        durationInFrames={Math.round((616 / 30) * fps)}
      >
        <Contract name="先认清它的承诺" durationSeconds={20.533333333333335} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="先问分配器"
        durationInFrames={Math.round((829 / 30) * fps)}
      >
        <Inside name="先问分配器" durationSeconds={27.633333333333333} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="连续的是虚拟地址"
        durationInFrames={Math.round((644 / 30) * fps)}
      >
        <Virtual name="连续的是虚拟地址" durationSeconds={21.466666666666665} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="给小画一块空间"
        durationInFrames={Math.round((676 / 30) * fps)}
      >
        <Allocate name="给小画一块空间" durationSeconds={22.533333333333335} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="先写入 再读取"
        durationInFrames={Math.round((536 / 30) * fps)}
      >
        <Initialize name="先写入 再读取" durationSeconds={17.866666666666667} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="画布变大了"
        durationInFrames={Math.round((661 / 30) * fps)}
      >
        <Resize name="画布变大了" durationSeconds={22.033333333333335} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="失败时 原画还在"
        durationInFrames={Math.round((674 / 30) * fps)}
      >
        <Failure name="失败时 原画还在" durationSeconds={22.466666666666665} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="归还使用权"
        durationInFrames={Math.round((697 / 30) * fps)}
      >
        <Release name="归还使用权" durationSeconds={23.233333333333334} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="问题常出在所有权"
        durationInFrames={Math.round((744 / 30) * fps)}
      >
        <Mistakes name="问题常出在所有权" durationSeconds={24.8} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="总量够 不一定放得下"
        durationInFrames={Math.round((802 / 30) * fps)}
      >
        <Fragment
          name="总量够 不一定放得下"
          durationSeconds={26.733333333333334}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="把用法连起来"
        durationInFrames={Math.round((645 / 30) * fps)}
      >
        <Practice name="把用法连起来" durationSeconds={21.5} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="灵活 也有管理成本"
        durationInFrames={Math.round((716 / 30) * fps)}
      >
        <Tradeoff
          name="灵活 也有管理成本"
          durationSeconds={23.866666666666667}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="管理对象的一生"
        durationInFrames={Math.round((493 / 30) * fps)}
      >
        <Closing name="管理对象的一生" durationSeconds={16.433333333333334} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
