# malloc 的一生：一张会长大的像素画

一部约 05:27 的中文动画讲解视频，以一张从 8 格增长到 16 格的像素画，串起动态内存的背景、机制与正确用法。

[观看 / 下载 1080p 成片](video/malloc-film.mp4) · [字幕](malloc的一生.srt) · [完整讲稿](讲解文稿.md) · [参考资料](参考资料.md)

![视频封面](poster.png)

## 作品内容

采用 Remotion 绘制连续动画，全片统一暖白底、陶土红与灰绿强调色，配有平稳的女声解说和中文字幕。开场直接进入扩容疑问，随后讲清需求、标准接口与分配器实现的演进。像素对象贯穿申请、初始化、搬迁、失败与释放，成功与失败明确标成两条分支。

关键动画使用语音 WordBoundary 时间触发，包含 73 个语义时间点；错误高亮、代码行、指针更新、像素初始化与碎片合并随对应解说发生。说明文字为 30 像素，代码主要为 37–43 像素，保留统一背景和留白。

| 开始时间 | 章节 |
| --- | --- |
| 00:00 | 一张会长大的像素画 |
| 00:08 | 从需求到实现 |
| 00:42 | 先认清它的承诺 |
| 01:02 | 先问分配器 |
| 01:29 | 连续的是虚拟地址 |
| 01:50 | 给小画一块空间 |
| 02:12 | 先写入 再读取 |
| 02:29 | 画布变大了 |
| 02:51 | 失败时 原画还在 |
| 03:13 | 归还使用权 |
| 03:35 | 问题常出在所有权 |
| 04:00 | 总量够 不一定放得下 |
| 04:26 | 把用法连起来 |
| 04:47 | 灵活 也有管理成本 |
| 05:10 | 管理对象的一生 |

这里的“创意案例”是贯穿全片的像素画叙事与动画演示。观看和渲染均不依赖鲁班猫开发板；随附的最小 C 示例也可以在普通电脑或 Linux 上运行。

## 直接使用

播放 `video/malloc-film.mp4` 即可。分辨率 1920 × 1080，30 fps，H.264 视频、AAC 音频；字幕已经烧录进画面，同时提供可独立使用的 SRT 文件。

## 编辑与重新渲染

工程已经包含本次完整配音，重新渲染不需要调用语音服务或下载语音模型。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm render
```

使用 Node.js 22.13+ 或 24，依赖版本锁定在 `pnpm-lock.yaml`。首次导出时 Remotion 可能需要下载 Chrome Headless Shell。画面中文字体依赖本机字体，跨系统应检查排版。

主合成是 `MallocFilm`；`Scenes` 文件夹内有 15 个独立章节，可以在 Studio 中逐章查看。

| 文件 | 用途 |
| --- | --- |
| `src/Visuals.tsx` | 统一背景、故事状态与 15 章视觉入口 |
| `src/*Scenes.tsx`、`src/visual-kit.tsx` | 历史、机制、生命周期与图解组件 |
| `visual-cue-definitions.json` | 将动画事件绑定到讲稿短语 |
| `src/visual-cues.json` | 根据实际配音生成的动画时间 |
| `src/Scenes.tsx` | 逐章配音、字幕与场景连接 |
| `src/Movie.tsx` | 主时间轴和转场 |
| `narration.json` | 解说文稿 |
| `public/voice/` | 已生成的女声配音 |
| `public/captions/` | 每章字幕时间 |
| `public/word-timing/` | 语音服务返回的逐词时间记录 |
| `examples/pixels.c` | 防溢出、判空、初始化、安全扩容和释放的最小示例 |

如需修改讲稿并重新生成声音，安装 `edge-tts==7.3.1` 后运行 `python tools/generate_broadcast.py`，再运行 `python tools/assemble.py`、`python tools/write_delivery_docs.py` 和 `python tools/verify_cues.py`。组装需要 FFmpeg 与 NumPy，会根据逐词时间构建字幕、动画事件与场景；修改讲稿时也应更新对应短语定义。没有额外加速或调高音调。在线服务可用性会变化，修改后仍需核对实际配音。

## 最小 C 示例

```sh
cc -std=c11 -Wall -Wextra -Wpedantic examples/pixels.c -o pixels
./pixels
```

本次正常路径使用 Windows TinyCC 实际编译并运行。动画中的分配失败、碎片和地址是教学示意，没有用未定义行为程序制造画面，也没有声称测量了开发板时延。详见 [验证记录](VALIDATION.md)。

技术边界与来源见 [参考资料](参考资料.md)，AI 辅助、配音和第三方组件说明见 [制作说明](制作说明.md)。
