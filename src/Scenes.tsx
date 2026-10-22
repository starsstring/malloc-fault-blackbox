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
            text: "一张像素画，",
            startMs: 600,
            endMs: 1714,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "从八格长到十六格。",
            startMs: 1714,
            endMs: 3590,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "原来的内存地址，",
            startMs: 3590,
            endMs: 4956,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "还能继续用吗？",
            startMs: 4956,
            endMs: 6270,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先别急着记函数名。",
            startMs: 6270,
            endMs: 8460,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们跟着这张小画，",
            startMs: 8460,
            endMs: 10180,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "看看空间怎样被申请、扩容，",
            startMs: 10180,
            endMs: 12590,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "又该在什么时候释放。",
            startMs: 12590,
            endMs: 13972,
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
      default: 14.8,
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
            text: "有些大小，",
            startMs: 600,
            endMs: 1526,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "写代码的时候还不知道。",
            startMs: 1526,
            endMs: 3020,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "比如用户会输入多长的文字，",
            startMs: 3020,
            endMs: 5550,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一张图片要存多少个像素。",
            startMs: 5550,
            endMs: 8040,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "动态内存分配，",
            startMs: 8040,
            endMs: 9480,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就是把申请空间的决定留到运行时。",
            startMs: 9480,
            endMs: 12920,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "这个想法早于 Linux，",
            startMs: 12920,
            endMs: 15030,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "早期 Unix 就有分配器。",
            startMs: 15030,
            endMs: 17270,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一九八七年，",
            startMs: 17270,
            endMs: 18840,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "Doug Lea 开始编写自己的实现；",
            startMs: 18840,
            endMs: 21210,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "后来和今天的各种 C 库，",
            startMs: 21210,
            endMs: 22868,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也一直在改进分配策略。",
            startMs: 22868,
            endMs: 25030,
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
      default: 25.833333333333332,
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
            text: "我们先看最基本的约定。",
            startMs: 620,
            endMs: 2230,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对非零大小的申请，",
            startMs: 2230,
            endMs: 4269,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "malloc 返回一块满足大小和基本对齐要求的空间，",
            startMs: 4269,
            endMs: 8130,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败就返回空指针。",
            startMs: 8130,
            endMs: 9860,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不过，",
            startMs: 9860,
            endMs: 10650,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "拿到空间不等于拿到了有效数据。",
            startMs: 10650,
            endMs: 13100,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它不会初始化内容，",
            startMs: 13100,
            endMs: 14840,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不会帮你决定什么时候释放。",
            startMs: 14840,
            endMs: 17150,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "这些事，",
            startMs: 17150,
            endMs: 18210,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "仍然由程序负责。",
            startMs: 18210,
            endMs: 19541,
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
      default: 20.366666666666667,
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
            text: "一次 malloc，",
            startMs: 600,
            endMs: 1800,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不一定要惊动操作系统。",
            startMs: 1800,
            endMs: 3940,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "以常见的 glibc 为例，",
            startMs: 3940,
            endMs: 6320,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "程序先找 C 库里的分配器，",
            startMs: 6320,
            endMs: 9000,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它会尝试复用缓存和空闲空间。",
            startMs: 9000,
            endMs: 12140,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "需要更多空间时，",
            startMs: 12140,
            endMs: 14040,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "才可能通过系统接口继续申请。",
            startMs: 14040,
            endMs: 16820,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "图里的拆分和复用，",
            startMs: 16820,
            endMs: 18770,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "只是解释思路的简化模型；",
            startMs: 18770,
            endMs: 21170,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "真实实现还要处理对齐、元数据和并发。",
            startMs: 21170,
            endMs: 25328,
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
      default: 26.133333333333333,
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
            text: "还有一个容易混淆的地方：",
            startMs: 600,
            endMs: 4310,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "程序看到连续的地址，",
            startMs: 4310,
            endMs: 6390,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "并不意味着物理内存里的页也挨在一起。",
            startMs: 6390,
            endMs: 10270,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它们可以通过映射连起来。",
            startMs: 10270,
            endMs: 12840,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "Linux 还可能按需建立物理页，",
            startMs: 12840,
            endMs: 15810,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "所以申请成功，",
            startMs: 15810,
            endMs: 17630,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不代表这片范围对应的物理内存已经全部到位。",
            startMs: 17630,
            endMs: 22319,
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
      default: 23.133333333333333,
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
            text: "现在给小画准备八个格子。",
            startMs: 600,
            endMs: 2810,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们用三十二位无符号整数表示像素，",
            startMs: 2810,
            endMs: 5760,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "在这个例子里，",
            startMs: 5760,
            endMs: 7150,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "每个像素占四字节，",
            startMs: 7150,
            endMs: 8860,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一共需要三十二字节。",
            startMs: 8860,
            endMs: 10660,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先检查数量乘以元素大小会不会溢出，",
            startMs: 10660,
            endMs: 14564,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "再申请，",
            startMs: 14564,
            endMs: 15272,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "紧接着判空。",
            startMs: 15272,
            endMs: 16460,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "别跳过这一步：",
            startMs: 16460,
            endMs: 17780,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "空指针不能拿来画画。",
            startMs: 17780,
            endMs: 19623,
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
      default: 20.433333333333334,
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
            text: "刚拿到的格子里，",
            startMs: 620,
            endMs: 1820,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不是一张现成的图。",
            startMs: 1820,
            endMs: 3460,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们要先在合法范围内写入颜色，",
            startMs: 3460,
            endMs: 6180,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "再读取像素。",
            startMs: 6180,
            endMs: 7280,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "如果需要把全部字节置零，",
            startMs: 7280,
            endMs: 9340,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "可以选择 calloc。",
            startMs: 9340,
            endMs: 10660,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它和 malloc 的初始化语义不一样，",
            startMs: 10660,
            endMs: 13400,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请失败时，",
            startMs: 13400,
            endMs: 14590,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也一样要处理。",
            startMs: 14590,
            endMs: 15600,
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
      default: 16.433333333333334,
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
            text: "画到一半，",
            startMs: 640,
            endMs: 1522,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "八格不够了。",
            startMs: 1522,
            endMs: 2490,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "那就用 realloc 试着扩到十六格。",
            startMs: 2490,
            endMs: 5380,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它可能原地调整，",
            startMs: 5380,
            endMs: 7060,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也可能把原来的内容搬到新位置。",
            startMs: 7060,
            endMs: 9760,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "成功后，",
            startMs: 9760,
            endMs: 10231,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "旧对象就失效了，",
            startMs: 10231,
            endMs: 12150,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "要使用返回的新指针。",
            startMs: 12150,
            endMs: 13850,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "旧范围的内容会保留，",
            startMs: 13850,
            endMs: 15630,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "新增加的格子，",
            startMs: 15630,
            endMs: 16699,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "则需要我们继续初始化。",
            startMs: 16699,
            endMs: 18757,
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
      default: 19.566666666666666,
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
            text: "如果扩容没成功呢？",
            startMs: 620,
            endMs: 2220,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对这里的非零请求，",
            startMs: 2220,
            endMs: 4030,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败会返回空指针，",
            startMs: 4030,
            endMs: 5620,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "但原来的对象仍然有效。",
            startMs: 5620,
            endMs: 7800,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "所以，",
            startMs: 7800,
            endMs: 8750,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先用临时指针接住结果，",
            startMs: 8750,
            endMs: 11110,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "成功了再更新。",
            startMs: 11110,
            endMs: 12610,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "直接覆盖原指针，",
            startMs: 12610,
            endMs: 14370,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就可能在失败时丢掉原块的唯一引用。",
            startMs: 14370,
            endMs: 17520,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "小画还在，",
            startMs: 17520,
            endMs: 18770,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "却再也找不到它了。",
            startMs: 18770,
            endMs: 20081,
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
      default: 20.9,
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
            text: "不再需要小画时，",
            startMs: 600,
            endMs: 2558,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就该释放这块空间了。",
            startMs: 2558,
            endMs: 5640,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "free 结束的是对象的生命周期，",
            startMs: 5640,
            endMs: 9160,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不承诺把内容清零，",
            startMs: 9160,
            endMs: 11420,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不保证马上归还操作系统。",
            startMs: 11420,
            endMs: 14490,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放以后，",
            startMs: 14490,
            endMs: 16090,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "即使某些颜色看起来还在，",
            startMs: 16090,
            endMs: 19180,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不能继续读写。",
            startMs: 19180,
            endMs: 21050,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "把一个指针设为空，",
            startMs: 21050,
            endMs: 22311,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不会自动修复指向旧对象的其他别名。",
            startMs: 22311,
            endMs: 26879,
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
      default: 27.7,
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
            text: "丢掉仍需释放的块的所有引用，",
            startMs: 600,
            endMs: 3324,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是内存泄漏。",
            startMs: 3324,
            endMs: 4480,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放后继续访问，",
            startMs: 4480,
            endMs: 5946,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是使用已经失效的对象。",
            startMs: 5946,
            endMs: 8320,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对同一块重复释放，",
            startMs: 8320,
            endMs: 10280,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也属于未定义行为。",
            startMs: 10280,
            endMs: 12000,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们不用真的执行这些错误，",
            startMs: 12000,
            endMs: 14340,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "只要记住一个问题：",
            startMs: 14340,
            endMs: 15950,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "现在谁拥有它，",
            startMs: 15950,
            endMs: 17400,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "最后由谁负责释放？",
            startMs: 17400,
            endMs: 18757,
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
      default: 19.566666666666666,
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
            startMs: 600,
            endMs: 2110,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "两块三十二字节的空闲空间，",
            startMs: 2110,
            endMs: 4631,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "被正在使用的块隔开。",
            startMs: 4631,
            endMs: 6540,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "总量虽然够，",
            startMs: 6540,
            endMs: 7510,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "却放不下一块四十八字节的连续请求。",
            startMs: 7510,
            endMs: 10520,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "如果中间块被释放，",
            startMs: 10520,
            endMs: 12309,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "相邻空闲块就可能合并。",
            startMs: 12309,
            endMs: 14320,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "当然，",
            startMs: 14320,
            endMs: 15120,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "实际分配器还可能向系统申请新空间，",
            startMs: 15120,
            endMs: 18310,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不能只看这张图就断言 malloc 一定失败。",
            startMs: 18310,
            endMs: 21239,
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
      default: 22.066666666666666,
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
            text: "把这些步骤连起来，",
            startMs: 620,
            endMs: 2210,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就有了一条完整路径：",
            startMs: 2210,
            endMs: 3370,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "大小计算要防溢出，",
            startMs: 3370,
            endMs: 5150,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请之后要判空，",
            startMs: 5150,
            endMs: 6580,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "读取之前先初始化，",
            startMs: 6580,
            endMs: 8400,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "访问始终守住边界。",
            startMs: 8400,
            endMs: 10020,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "扩容使用临时指针，",
            startMs: 10020,
            endMs: 11820,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败分支保留清楚的所有权。",
            startMs: 11820,
            endMs: 14230,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "最后，",
            startMs: 14230,
            endMs: 14559,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "让仍由程序拥有的每一块空间，",
            startMs: 14559,
            endMs: 17085,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "恰好释放一次。",
            startMs: 17085,
            endMs: 18301,
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
      default: 19.133333333333333,
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
            startMs: 680,
            endMs: 2600,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "动态分配带来了灵活性，",
            startMs: 2600,
            endMs: 4900,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也带来了资源和时序上的管理成本。",
            startMs: 4900,
            endMs: 7800,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对于要求严格的任务，",
            startMs: 7800,
            endMs: 9710,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "可以评估预分配、固定容量或者内存池。",
            startMs: 9710,
            endMs: 13420,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是否使用 malloc，",
            startMs: 13420,
            endMs: 14925,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "要看对象的寿命、资源预算和时序要求，",
            startMs: 14925,
            endMs: 18410,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不能只凭一种写法就保证硬实时。",
            startMs: 18410,
            endMs: 21466,
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
      default: 22.266666666666666,
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
            text: "现在回到开头。",
            startMs: 640,
            endMs: 2480,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "小画变大了，",
            startMs: 2480,
            endMs: 3870,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "地址可能改变，",
            startMs: 3870,
            endMs: 5630,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "扩容也可能失败。",
            startMs: 5630,
            endMs: 7430,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "理解 malloc，",
            startMs: 7430,
            endMs: 8421,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不只是记住怎么申请空间，",
            startMs: 8421,
            endMs: 10900,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "更是管理对象的一生：",
            startMs: 10900,
            endMs: 13160,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请有依据，",
            startMs: 13160,
            endMs: 14720,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "使用有边界，",
            startMs: 14720,
            endMs: 16270,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放有归属。",
            startMs: 16270,
            endMs: 17826,
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
      default: 18.633333333333333,
      description: "Scene duration in seconds",
    },
  },
});
