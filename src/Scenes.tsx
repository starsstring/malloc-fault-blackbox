import { Interactive, staticFile, useVideoConfig } from "remotion";

import { Audio } from "@remotion/media";

import { SceneArt } from "./Visuals";

import { BasicCaptions } from "./basic-captions";

const OpeningContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="opening" duration={durationSeconds} />
      <Audio
        name="Opening 解说"
        from={0.6 * fps}
        src={staticFile("voice/Opening.mp3")}
      />
      <BasicCaptions
        name="Opening 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "八格不够了。",
            startMs: 641,
            endMs: 2262,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "扩到十六格，",
            startMs: 2262,
            endMs: 3537,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "像素要搬家吗？",
            startMs: 3537,
            endMs: 5247,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "跟着这张小画，",
            startMs: 5247,
            endMs: 6624,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "走一遍内存的一生。",
            startMs: 6624,
            endMs: 8285,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Opening = Interactive.create({
  Component: OpeningContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 9.1,
      description: "Scene duration in seconds",
    },
  },
});

const BackgroundContent = ({
  durationSeconds,
}: {
  durationSeconds: number;
}) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="background" duration={durationSeconds} />
      <Audio
        name="Background 解说"
        from={0.6 * fps}
        src={staticFile("voice/Background.mp3")}
      />
      <BasicCaptions
        name="Background 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "为什么需要动态分配？",
            startMs: 641,
            endMs: 2861,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "输入长短、图片大小，",
            startMs: 2861,
            endMs: 5234,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "往往运行时才知道。",
            startMs: 5234,
            endMs: 7606,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "早期 Unix 已经提供了内存分配器。",
            startMs: 7606,
            endMs: 11318,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一九八七年，",
            startMs: 11318,
            endMs: 12670,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "Doug Lea 开始编写自己的实现，",
            startMs: 12670,
            endMs: 15361,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "权衡速度、空间和碎片。",
            startMs: 15361,
            endMs: 18206,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "C 标准规定接口要做什么；",
            startMs: 18206,
            endMs: 20948,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "具体怎样找空间，",
            startMs: 20948,
            endMs: 22555,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "由 C 库的实现决定。",
            startMs: 22555,
            endMs: 24673,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "今天，",
            startMs: 24673,
            endMs: 25527,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "各种分配器仍在改进复用和并发。",
            startMs: 25527,
            endMs: 29099,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "接口相对稳定，",
            startMs: 29099,
            endMs: 30706,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "背后的机制一直在演进。",
            startMs: 30706,
            endMs: 33073,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Background = Interactive.create({
  Component: BackgroundContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 33.9,
      description: "Scene duration in seconds",
    },
  },
});

const ContractContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="contract" duration={durationSeconds} />
      <Audio
        name="Contract 解说"
        from={0.6 * fps}
        src={staticFile("voice/Contract.mp3")}
      />
      <BasicCaptions
        name="Contract 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "先认清 malloc 的承诺。",
            startMs: 641,
            endMs: 3219,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对非零请求，",
            startMs: 3219,
            endMs: 4673,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它提供满足大小和基本对齐要求的空间；",
            startMs: 4673,
            endMs: 8333,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败，",
            startMs: 8333,
            endMs: 9022,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "返回空指针。",
            startMs: 9022,
            endMs: 10693,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "但拿到空间，",
            startMs: 10693,
            endMs: 11956,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "还不等于拿到了有效数据。",
            startMs: 11956,
            endMs: 14685,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "初始化、访问边界和释放时机，",
            startMs: 14685,
            endMs: 17976,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "仍然由程序负责。",
            startMs: 17976,
            endMs: 19725,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Contract = Interactive.create({
  Component: ContractContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 20.533333333333335,
      description: "Scene duration in seconds",
    },
  },
});

const InsideContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="inside" duration={durationSeconds} />
      <Audio
        name="Inside 解说"
        from={0.6 * fps}
        src={staticFile("voice/Inside.mp3")}
      />
      <BasicCaptions
        name="Inside 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "小画需要三十二字节。",
            startMs: 641,
            endMs: 3078,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一次 malloc，",
            startMs: 3078,
            endMs: 4354,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "会先找到 C 库里的分配器。",
            startMs: 4354,
            endMs: 7071,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "以常见的 glibc 为例，",
            startMs: 7071,
            endMs: 8946,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它会尝试复用缓存和空闲块。",
            startMs: 8946,
            endMs: 12096,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "图里，",
            startMs: 12096,
            endMs: 12874,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一块六十四字节的空闲空间，",
            startMs: 12874,
            endMs: 15349,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "被拆出三十二字节给小画。",
            startMs: 15349,
            endMs: 18168,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "已有空间不够时，",
            startMs: 18168,
            endMs: 19800,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "才可能向操作系统继续申请。",
            startMs: 19800,
            endMs: 22810,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "真实实现还要处理对齐、元数据和并发。",
            startMs: 22810,
            endMs: 26833,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Inside = Interactive.create({
  Component: InsideContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 27.633333333333333,
      description: "Scene duration in seconds",
    },
  },
});

const VirtualContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="virtual" duration={durationSeconds} />
      <Audio
        name="Virtual 解说"
        from={0.6 * fps}
        src={staticFile("voice/Virtual.mp3")}
      />
      <BasicCaptions
        name="Virtual 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "如果画布继续长大，",
            startMs: 641,
            endMs: 2363,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "跨过多个内存页，",
            startMs: 2363,
            endMs: 3855,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "地址又会怎样？",
            startMs: 3855,
            endMs: 5617,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "程序看到的连续地址，",
            startMs: 5617,
            endMs: 7670,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不意味着物理页也挨在一起。",
            startMs: 7670,
            endMs: 10514,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它们通过映射连接。",
            startMs: 10514,
            endMs: 12632,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "Linux 还可能按需建立物理页，",
            startMs: 12632,
            endMs: 15642,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "所以申请成功，",
            startMs: 15642,
            endMs: 17109,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不代表对应的物理内存已经全部到位。",
            startMs: 17109,
            endMs: 20616,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Virtual = Interactive.create({
  Component: VirtualContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 21.466666666666665,
      description: "Scene duration in seconds",
    },
  },
});

const AllocateContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="allocate" duration={durationSeconds} />
      <Audio
        name="Allocate 解说"
        from={0.6 * fps}
        src={staticFile("voice/Allocate.mp3")}
      />
      <BasicCaptions
        name="Allocate 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "现在，",
            startMs: 641,
            endMs: 1470,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "正式给小画申请八个格子。",
            startMs: 1470,
            endMs: 4328,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "这里每个像素占四字节，",
            startMs: 4328,
            endMs: 6599,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一共三十二字节。",
            startMs: 6599,
            endMs: 8601,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "第一步，",
            startMs: 8601,
            endMs: 9481,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "检查数量乘以元素大小是否溢出。",
            startMs: 9481,
            endMs: 13040,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "第二步，",
            startMs: 13040,
            endMs: 13869,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "调用 malloc。",
            startMs: 13869,
            endMs: 15438,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "第三步，",
            startMs: 15438,
            endMs: 16382,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "立即判空。",
            startMs: 16382,
            endMs: 17798,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请成功之后，",
            startMs: 17798,
            endMs: 19341,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "才能在合法范围内使用它。",
            startMs: 19341,
            endMs: 21719,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Allocate = Interactive.create({
  Component: AllocateContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 22.533333333333335,
      description: "Scene duration in seconds",
    },
  },
});

const InitializeContent = ({
  durationSeconds,
}: {
  durationSeconds: number;
}) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="initialize" duration={durationSeconds} />
      <Audio
        name="Initialize 解说"
        from={0.6 * fps}
        src={staticFile("voice/Initialize.mp3")}
      />
      <BasicCaptions
        name="Initialize 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "刚拿到的格子，",
            startMs: 641,
            endMs: 2095,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "还不是一张现成的图。",
            startMs: 2095,
            endMs: 4264,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先在合法范围内写入颜色，",
            startMs: 4264,
            endMs: 6879,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "再读取像素。",
            startMs: 6879,
            endMs: 8601,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "如果想让全部字节一开始就是零，",
            startMs: 8601,
            endMs: 11369,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "可以选择 calloc。",
            startMs: 11369,
            endMs: 13231,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "两种申请都可能失败，",
            startMs: 13231,
            endMs: 15208,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也都需要检查结果。",
            startMs: 15208,
            endMs: 17045,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Initialize = Interactive.create({
  Component: InitializeContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 17.866666666666667,
      description: "Scene duration in seconds",
    },
  },
});

const ResizeContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="resize" duration={durationSeconds} />
      <Audio
        name="Resize 解说"
        from={0.6 * fps}
        src={staticFile("voice/Resize.mp3")}
      />
      <BasicCaptions
        name="Resize 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "八格不够了，",
            startMs: 641,
            endMs: 1891,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就用 realloc 试着扩到十六格。",
            startMs: 1891,
            endMs: 5183,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它可能原地调整，",
            startMs: 5183,
            endMs: 6790,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也可能搬到新位置。",
            startMs: 6790,
            endMs: 8907,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "搬迁时，",
            startMs: 8907,
            endMs: 9915,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "旧范围的内容会保留。",
            startMs: 9915,
            endMs: 12160,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "成功返回后，",
            startMs: 12160,
            endMs: 13448,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "旧对象失效，",
            startMs: 13448,
            endMs: 14736,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "要改用新指针。",
            startMs: 14736,
            endMs: 16560,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "新增加的格子还没初始化，",
            startMs: 16560,
            endMs: 19124,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先写入，",
            startMs: 19124,
            endMs: 20081,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "再继续画。",
            startMs: 20081,
            endMs: 21215,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Resize = Interactive.create({
  Component: ResizeContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 22.033333333333335,
      description: "Scene duration in seconds",
    },
  },
});

const FailureContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="failure" duration={durationSeconds} />
      <Audio
        name="Failure 解说"
        from={0.6 * fps}
        src={staticFile("voice/Failure.mp3")}
      />
      <BasicCaptions
        name="Failure 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "换一条分支：",
            startMs: 641,
            endMs: 1955,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "如果扩容失败呢？",
            startMs: 1955,
            endMs: 3767,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对这里的非零请求，",
            startMs: 3767,
            endMs: 5578,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "返回值是空指针，",
            startMs: 5578,
            endMs: 7390,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "原来的小画仍然有效。",
            startMs: 7390,
            endMs: 9775,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "所以，",
            startMs: 9775,
            endMs: 10655,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先用临时指针接住结果，",
            startMs: 10655,
            endMs: 12887,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "成功了再更新。",
            startMs: 12887,
            endMs: 14634,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "直接覆盖原指针，",
            startMs: 14634,
            endMs: 16293,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就可能丢掉原块的唯一引用。",
            startMs: 16293,
            endMs: 19086,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "小画还在，",
            startMs: 19086,
            endMs: 20272,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "却找不到它了。",
            startMs: 20272,
            endMs: 21636,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Failure = Interactive.create({
  Component: FailureContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 22.466666666666665,
      description: "Scene duration in seconds",
    },
  },
});

const ReleaseContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="release" duration={durationSeconds} />
      <Audio
        name="Release 解说"
        from={0.6 * fps}
        src={staticFile("voice/Release.mp3")}
      />
      <BasicCaptions
        name="Release 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "小画用完了，",
            startMs: 641,
            endMs: 1929,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就该释放空间。",
            startMs: 1929,
            endMs: 3690,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "free 结束对象的生命周期，",
            startMs: 3690,
            endMs: 6178,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不承诺清零，",
            startMs: 6178,
            endMs: 7530,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不保证马上归还操作系统。",
            startMs: 7530,
            endMs: 10668,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放以后，",
            startMs: 10668,
            endMs: 11815,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "颜色即使看起来还在，",
            startMs: 11815,
            endMs: 13767,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不能再读写。",
            startMs: 13767,
            endMs: 15489,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "把 p 设为空，",
            startMs: 15489,
            endMs: 16777,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "只处理了这一个指针；",
            startMs: 16777,
            endMs: 18729,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "其他指向旧对象的别名，",
            startMs: 18729,
            endMs: 20948,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "仍然已经失效。",
            startMs: 20948,
            endMs: 22429,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Release = Interactive.create({
  Component: ReleaseContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 23.233333333333334,
      description: "Scene duration in seconds",
    },
  },
});

const MistakesContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="mistakes" duration={durationSeconds} />
      <Audio
        name="Mistakes 解说"
        from={0.6 * fps}
        src={staticFile("voice/Mistakes.mp3")}
      />
      <BasicCaptions
        name="Mistakes 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "把三种错误分清楚。",
            startMs: 641,
            endMs: 2900,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "所有引用都丢了，",
            startMs: 2900,
            endMs: 4634,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "仍需释放的内存找不回来，",
            startMs: 4634,
            endMs: 7045,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "这是内存泄漏。",
            startMs: 7045,
            endMs: 8818,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放以后还去访问，",
            startMs: 8818,
            endMs: 10693,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是使用已经失效的对象。",
            startMs: 10693,
            endMs: 13180,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "同一块空间再次释放，",
            startMs: 13180,
            endMs: 15170,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是重复释放，",
            startMs: 15170,
            endMs: 16497,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也属于未定义行为。",
            startMs: 16497,
            endMs: 18627,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它们共同指向一个问题：",
            startMs: 18627,
            endMs: 20668,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "现在谁拥有它，",
            startMs: 20668,
            endMs: 22109,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "最后由谁负责释放？",
            startMs: 22109,
            endMs: 23970,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Mistakes = Interactive.create({
  Component: MistakesContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 24.8,
      description: "Scene duration in seconds",
    },
  },
});

const FragmentContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="fragment" duration={durationSeconds} />
      <Audio
        name="Fragment 解说"
        from={0.6 * fps}
        src={staticFile("voice/Fragment.mp3")}
      />
      <BasicCaptions
        name="Fragment 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "再看一个受限区域。",
            startMs: 641,
            endMs: 2772,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "两块三十二字节的空闲空间，",
            startMs: 2772,
            endMs: 5463,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "被正在使用的块隔开。",
            startMs: 5463,
            endMs: 7785,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "总量虽然够，",
            startMs: 7785,
            endMs: 9060,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "却放不下一块四十八字节的连续请求。",
            startMs: 9060,
            endMs: 12670,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "如果中间块被释放，",
            startMs: 12670,
            endMs: 14571,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "相邻空闲块就可能合并。",
            startMs: 14571,
            endMs: 17351,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "当然，",
            startMs: 17351,
            endMs: 18168,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "实际分配器还可能向系统申请新空间，",
            startMs: 18168,
            endMs: 21854,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不能只看这张图就断言 malloc 一定失败。",
            startMs: 21854,
            endMs: 25884,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Fragment = Interactive.create({
  Component: FragmentContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 26.733333333333334,
      description: "Scene duration in seconds",
    },
  },
});

const PracticeContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="practice" duration={durationSeconds} />
      <Audio
        name="Practice 解说"
        from={0.6 * fps}
        src={staticFile("voice/Practice.mp3")}
      />
      <BasicCaptions
        name="Practice 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "把小画的一生连起来。",
            startMs: 641,
            endMs: 2874,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "计算大小，",
            startMs: 2874,
            endMs: 4035,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先防溢出。",
            startMs: 4035,
            endMs: 5527,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请之后，",
            startMs: 5527,
            endMs: 6675,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "立即判空。",
            startMs: 6675,
            endMs: 8091,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "读取之前，",
            startMs: 8091,
            endMs: 9239,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先初始化，",
            startMs: 9239,
            endMs: 10336,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "并守住边界。",
            startMs: 10336,
            endMs: 12058,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "扩容用临时指针，",
            startMs: 12058,
            endMs: 13831,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败保留原块。",
            startMs: 13831,
            endMs: 15680,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "最后，",
            startMs: 15680,
            endMs: 16497,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "让仍由程序拥有的每块空间，",
            startMs: 16497,
            endMs: 19201,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "恰好释放一次。",
            startMs: 19201,
            endMs: 20691,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Practice = Interactive.create({
  Component: PracticeContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 21.5,
      description: "Scene duration in seconds",
    },
  },
});

const TradeoffContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="tradeoff" duration={durationSeconds} />
      <Audio
        name="Tradeoff 解说"
        from={0.6 * fps}
        src={staticFile("voice/Tradeoff.mp3")}
      />
      <BasicCaptions
        name="Tradeoff 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "放到嵌入式系统里，",
            startMs: 641,
            endMs: 2542,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "动态分配带来了灵活性，",
            startMs: 2542,
            endMs: 4748,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也带来了资源和时序上的管理成本。",
            startMs: 4748,
            endMs: 8219,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对于要求严格的任务，",
            startMs: 8219,
            endMs: 10132,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "可以评估预分配、固定容量或者内存池。",
            startMs: 10132,
            endMs: 14354,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是否使用 malloc，",
            startMs: 14354,
            endMs: 16063,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "要看对象的寿命、资源预算和时序要求，",
            startMs: 16063,
            endMs: 20043,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不能只凭一种写法就保证硬实时。",
            startMs: 20043,
            endMs: 23066,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Tradeoff = Interactive.create({
  Component: TradeoffContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 23.866666666666667,
      description: "Scene duration in seconds",
    },
  },
});

const ClosingContent = ({ durationSeconds }: { durationSeconds: number }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <SceneArt kind="closing" duration={durationSeconds} />
      <Audio
        name="Closing 解说"
        from={0.6 * fps}
        src={staticFile("voice/Closing.mp3")}
      />
      <BasicCaptions
        name="Closing 字幕"
        width={2320}
        style={{
          position: "absolute",
          left: -200,
          bottom: 35,
          scale: 0.75,
          transformOrigin: "bottom center",
        }}
        captions={[
          {
            text: "回到最初的问题。",
            startMs: 641,
            endMs: 2657,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "扩容可能搬家，",
            startMs: 2657,
            endMs: 3997,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也可能失败；",
            startMs: 3997,
            endMs: 5259,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "成功后，",
            startMs: 5259,
            endMs: 6127,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "要使用返回的新指针。",
            startMs: 6127,
            endMs: 8448,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "小画的生命周期，",
            startMs: 8448,
            endMs: 10132,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也是一份责任：",
            startMs: 10132,
            endMs: 11535,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请有依据，",
            startMs: 11535,
            endMs: 12861,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "使用有边界，",
            startMs: 12861,
            endMs: 14150,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放有归属。",
            startMs: 14150,
            endMs: 15590,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
        ]}
      />
    </>
  );
};
export const Closing = Interactive.create({
  Component: ClosingContent,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    durationSeconds: {
      type: "number",
      min: 1,
      step: 0.1,
      hiddenFromList: false,
      default: 16.433333333333334,
      description: "Scene duration in seconds",
    },
  },
});
