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
        durationInFrames={Math.round((444 / 30) * fps)}
      >
        <Opening name="一张会长大的像素画" durationSeconds={14.8} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="为什么需要它"
        durationInFrames={Math.round((775 / 30) * fps)}
      >
        <Background name="为什么需要它" durationSeconds={25.833333333333332} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="先认清它的承诺"
        durationInFrames={Math.round((611 / 30) * fps)}
      >
        <Contract name="先认清它的承诺" durationSeconds={20.366666666666667} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="先问分配器"
        durationInFrames={Math.round((784 / 30) * fps)}
      >
        <Inside name="先问分配器" durationSeconds={26.133333333333333} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="连续的是虚拟地址"
        durationInFrames={Math.round((694 / 30) * fps)}
      >
        <Virtual name="连续的是虚拟地址" durationSeconds={23.133333333333333} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="给小画一块空间"
        durationInFrames={Math.round((613 / 30) * fps)}
      >
        <Allocate name="给小画一块空间" durationSeconds={20.433333333333334} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="先写入 再读取"
        durationInFrames={Math.round((493 / 30) * fps)}
      >
        <Initialize name="先写入 再读取" durationSeconds={16.433333333333334} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="画布变大了"
        durationInFrames={Math.round((587 / 30) * fps)}
      >
        <Resize name="画布变大了" durationSeconds={19.566666666666666} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="失败时 原画还在"
        durationInFrames={Math.round((627 / 30) * fps)}
      >
        <Failure name="失败时 原画还在" durationSeconds={20.9} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="归还使用权"
        durationInFrames={Math.round((831 / 30) * fps)}
      >
        <Release name="归还使用权" durationSeconds={27.7} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="问题常出在所有权"
        durationInFrames={Math.round((587 / 30) * fps)}
      >
        <Mistakes
          name="问题常出在所有权"
          durationSeconds={19.566666666666666}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="总量够 不一定放得下"
        durationInFrames={Math.round((662 / 30) * fps)}
      >
        <Fragment
          name="总量够 不一定放得下"
          durationSeconds={22.066666666666666}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="把用法连起来"
        durationInFrames={Math.round((574 / 30) * fps)}
      >
        <Practice name="把用法连起来" durationSeconds={19.133333333333333} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="灵活 也有管理成本"
        durationInFrames={Math.round((668 / 30) * fps)}
      >
        <Tradeoff
          name="灵活 也有管理成本"
          durationSeconds={22.266666666666666}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence
        name="管理对象的一生"
        durationInFrames={Math.round((559 / 30) * fps)}
      >
        <Closing name="管理对象的一生" durationSeconds={18.633333333333333} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
