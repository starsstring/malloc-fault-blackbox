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
            startMs: 641,
            endMs: 1878,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "从八格长到十六格。",
            startMs: 1878,
            endMs: 4111,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "原来的内存地址，",
            startMs: 4111,
            endMs: 5642,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "还能继续用吗？",
            startMs: 5642,
            endMs: 7351,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先别急着记函数名。",
            startMs: 7351,
            endMs: 9736,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们跟着这张小画，",
            startMs: 9736,
            endMs: 11344,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "看看空间怎样被申请、扩容，",
            startMs: 11344,
            endMs: 14226,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "又该在什么时候释放。",
            startMs: 14226,
            endMs: 16024,
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
      default: 16.866666666666667,
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
            startMs: 641,
            endMs: 1840,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "写代码的时候还不知道。",
            startMs: 1840,
            endMs: 4162,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "比如用户会输入多长的文字，",
            startMs: 4162,
            endMs: 6994,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一张图片要存多少个像素。",
            startMs: 6994,
            endMs: 9864,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "动态内存分配，",
            startMs: 9864,
            endMs: 11446,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就是把申请空间的决定留到运行时。",
            startMs: 11446,
            endMs: 15170,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "这个想法早于 Linux，",
            startMs: 15170,
            endMs: 17211,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "早期 Unix 就有分配器。",
            startMs: 17211,
            endMs: 19953,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一九八七年，",
            startMs: 19953,
            endMs: 21331,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "Doug Lea 开始编写自己的实现；",
            startMs: 21331,
            endMs: 24264,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "后来和今天的各种 C 库，",
            startMs: 24264,
            endMs: 26420,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也一直在改进分配策略。",
            startMs: 26420,
            endMs: 28680,
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
      default: 29.5,
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
            startMs: 641,
            endMs: 3053,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对非零大小的申请，",
            startMs: 3053,
            endMs: 4864,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "malloc 返回一块满足大小和基本对齐要求的空间，",
            startMs: 4864,
            endMs: 9341,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败就返回空指针。",
            startMs: 9341,
            endMs: 11637,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不过，",
            startMs: 11637,
            endMs: 12415,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "拿到空间不等于拿到了有效数据。",
            startMs: 12415,
            endMs: 15910,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它不会初始化内容，",
            startMs: 15910,
            endMs: 17670,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不会帮你决定什么时候释放。",
            startMs: 17670,
            endMs: 20693,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "这些事，",
            startMs: 20693,
            endMs: 21650,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "仍然由程序负责。",
            startMs: 21650,
            endMs: 23322,
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
      default: 24.133333333333333,
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
            startMs: 641,
            endMs: 1917,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不一定要惊动操作系统。",
            startMs: 1917,
            endMs: 4328,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "以常见的 glibc 为例，",
            startMs: 4328,
            endMs: 6229,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "程序先找 C 库里的分配器，",
            startMs: 6229,
            endMs: 8754,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它会尝试复用缓存和空闲空间。",
            startMs: 8754,
            endMs: 12122,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "需要更多空间时，",
            startMs: 12122,
            endMs: 13780,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "才可能通过系统接口继续申请。",
            startMs: 13780,
            endMs: 17045,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "图里的拆分和复用，",
            startMs: 17045,
            endMs: 18920,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "只是解释思路的简化模型；",
            startMs: 18920,
            endMs: 21395,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "真实实现还要处理对齐、元数据和并发。",
            startMs: 21395,
            endMs: 25527,
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
      default: 26.366666666666667,
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
            startMs: 641,
            endMs: 2835,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "程序看到连续的地址，",
            startMs: 2835,
            endMs: 4877,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "并不意味着物理内存里的页也挨在一起。",
            startMs: 4877,
            endMs: 9060,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它们可以通过映射连起来。",
            startMs: 9060,
            endMs: 11535,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "Linux 还可能按需建立物理页，",
            startMs: 11535,
            endMs: 14456,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "所以申请成功，",
            startMs: 14456,
            endMs: 15859,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不代表这片范围对应的物理内存已经全部到位。",
            startMs: 15859,
            endMs: 20239,
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
      default: 21.066666666666666,
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
            startMs: 641,
            endMs: 3525,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们用三十二位无符号整数表示像素，",
            startMs: 3525,
            endMs: 7109,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "在这个例子里，",
            startMs: 7109,
            endMs: 8372,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "每个像素占四字节，",
            startMs: 8372,
            endMs: 10247,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "一共需要三十二字节。",
            startMs: 10247,
            endMs: 12606,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先检查数量乘以元素大小会不会溢出，",
            startMs: 12606,
            endMs: 16242,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "再申请，",
            startMs: 16242,
            endMs: 17185,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "紧接着判空。",
            startMs: 17185,
            endMs: 18818,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "别跳过这一步：",
            startMs: 18818,
            endMs: 20196,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "空指针不能拿来画画。",
            startMs: 20196,
            endMs: 22198,
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
      default: 23.033333333333335,
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
            startMs: 641,
            endMs: 2159,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不是一张现成的图。",
            startMs: 2159,
            endMs: 4277,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们要先在合法范围内写入颜色，",
            startMs: 4277,
            endMs: 7262,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "再读取像素。",
            startMs: 7262,
            endMs: 8984,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "如果需要把全部字节置零，",
            startMs: 8984,
            endMs: 11140,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "可以选择 calloc。",
            startMs: 11140,
            endMs: 13231,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它和 malloc 的初始化语义不一样，",
            startMs: 13231,
            endMs: 15884,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请失败时，",
            startMs: 15884,
            endMs: 17211,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也一样要处理。",
            startMs: 17211,
            endMs: 18613,
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
      default: 19.466666666666665,
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
            startMs: 641,
            endMs: 1712,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "八格不够了。",
            startMs: 1712,
            endMs: 3244,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "那就用 realloc 试着扩到十六格。",
            startMs: 3244,
            endMs: 6752,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "它可能原地调整，",
            startMs: 6752,
            endMs: 8384,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也可能把原来的内容搬到新位置。",
            startMs: 8384,
            endMs: 11764,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "成功后，",
            startMs: 11764,
            endMs: 12683,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "旧对象就失效了，",
            startMs: 12683,
            endMs: 14303,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "要使用返回的新指针。",
            startMs: 14303,
            endMs: 16573,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "旧范围的内容会保留，",
            startMs: 16573,
            endMs: 18448,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "新增加的格子，",
            startMs: 18448,
            endMs: 19941,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "则需要我们继续初始化。",
            startMs: 19941,
            endMs: 21917,
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
      default: 22.766666666666666,
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
            startMs: 641,
            endMs: 2772,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对这里的非零请求，",
            startMs: 2772,
            endMs: 4596,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败会返回空指针，",
            startMs: 4596,
            endMs: 6777,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "但原来的对象仍然有效。",
            startMs: 6777,
            endMs: 9367,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "所以，",
            startMs: 9367,
            endMs: 10247,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "先用临时指针接住结果，",
            startMs: 10247,
            endMs: 12479,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "成功了再更新。",
            startMs: 12479,
            endMs: 14226,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "直接覆盖原指针，",
            startMs: 14226,
            endMs: 15948,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就可能在失败时丢掉原块的唯一引用。",
            startMs: 15948,
            endMs: 19813,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "小画还在，",
            startMs: 19813,
            endMs: 20999,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "却再也找不到它了。",
            startMs: 20999,
            endMs: 22631,
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
      default: 23.466666666666665,
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
            startMs: 641,
            endMs: 2223,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就该释放这块空间了。",
            startMs: 2223,
            endMs: 4430,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "free 结束的是对象的生命周期，",
            startMs: 4430,
            endMs: 7351,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不承诺把内容清零，",
            startMs: 7351,
            endMs: 9303,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不保证马上归还操作系统。",
            startMs: 9303,
            endMs: 12402,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放以后，",
            startMs: 12402,
            endMs: 13576,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "即使某些颜色看起来还在，",
            startMs: 13576,
            endMs: 15948,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不能继续读写。",
            startMs: 15948,
            endMs: 17887,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "把一个指针设为空，",
            startMs: 17887,
            endMs: 19736,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也不会自动修复指向旧对象的其他别名。",
            startMs: 19736,
            endMs: 23468,
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
      default: 24.3,
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
            startMs: 641,
            endMs: 3294,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是内存泄漏。",
            startMs: 3294,
            endMs: 4940,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放后继续访问，",
            startMs: 4940,
            endMs: 6675,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "是使用已经失效的对象。",
            startMs: 6675,
            endMs: 9188,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "对同一块重复释放，",
            startMs: 9188,
            endMs: 10986,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "也属于未定义行为。",
            startMs: 10986,
            endMs: 13091,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "我们不用真的执行这些错误，",
            startMs: 13091,
            endMs: 15425,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "只要记住一个问题：",
            startMs: 15425,
            endMs: 17096,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "现在谁拥有它，",
            startMs: 17096,
            endMs: 18537,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "最后由谁负责释放？",
            startMs: 18537,
            endMs: 20373,
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
      default: 21.2,
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
            text: "把这些步骤连起来，",
            startMs: 641,
            endMs: 2223,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "就有了一条完整路径：",
            startMs: 2223,
            endMs: 4136,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "大小计算要防溢出，",
            startMs: 4136,
            endMs: 5947,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请之后要判空，",
            startMs: 5947,
            endMs: 7657,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "读取之前先初始化，",
            startMs: 7657,
            endMs: 9634,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "访问始终守住边界。",
            startMs: 9634,
            endMs: 11969,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "扩容使用临时指针，",
            startMs: 11969,
            endMs: 13895,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "失败分支保留清楚的所有权。",
            startMs: 13895,
            endMs: 17071,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "最后，",
            startMs: 17071,
            endMs: 17887,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "让仍由程序拥有的每一块空间，",
            startMs: 17887,
            endMs: 20387,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "恰好释放一次。",
            startMs: 20387,
            endMs: 21917,
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
      default: 22.766666666666666,
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
            text: "现在回到开头。",
            startMs: 641,
            endMs: 2594,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "小画变大了，",
            startMs: 2594,
            endMs: 3997,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "地址可能改变，",
            startMs: 3997,
            endMs: 5489,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "扩容也可能失败。",
            startMs: 5489,
            endMs: 7440,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "理解 malloc，",
            startMs: 7440,
            endMs: 8818,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "不只是记住怎么申请空间，",
            startMs: 8818,
            endMs: 11331,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "更是管理对象的一生：",
            startMs: 11331,
            endMs: 13206,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "申请有依据，",
            startMs: 13206,
            endMs: 14520,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "使用有边界，",
            startMs: 14520,
            endMs: 15833,
            timestampMs: null,
            confidence: null,
            pageBreakAfter: true,
          },
          {
            text: "释放有归属。",
            startMs: 15833,
            endMs: 17327,
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
      default: 18.133333333333333,
      description: "Scene duration in seconds",
    },
  },
});
