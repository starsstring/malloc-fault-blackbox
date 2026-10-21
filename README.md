# malloc 研究与故障现场黑匣子

嵌入式 Linux 课程作业。围绕 `malloc` 的背景、历史、机制与用法，设计并实现一个故障上下文快照程序。

平时用固定环形缓冲区覆盖最近几帧数据；温度达到阈值时，用一次 `malloc` 保存独立快照。后续采样覆盖实时缓冲区，历史快照仍保持原内容。程序同时演示内存预算限制、申请失败隔离和统一释放。

## 报告与案例筛选

- [完整研究报告 Markdown](docs/malloc-study.md)
- [报告 PDF](docs/malloc-study.pdf)
- [可编辑 Word 报告](docs/malloc-study.docx)
- [后续 Linux 验证记录](VALIDATION.md)

`docs/` 内报告保留 Windows 阶段成稿，Linux 自动测试是上传 GitHub 后补充的验证，见上方记录。

报告比较了学生信息链表、传感器数组扩容、手写简化分配器和故障现场黑匣子四种方案。本例选择黑匣子，是为了具体说明实时数据与事件数据的不同生命周期。
环形缓冲区和快照是已有方法，报告注明了与 Linux ftrace 快照机制的关系；本项目不宣称算法首创，也不将题目唯一作为已验证结论。

## 快速运行

源码为标准 C11 用户态程序，输入为模拟数据，无需外接传感器或 GPIO。
在普通 Linux 或鲁班猫的终端中进入仓库目录：

```sh
make
./blackbox_demo/blackbox --budget 256
make test
```

需要 C 编译器、make 和 Python 3。默认编译选项为 `-std=c11 -O2 -Wall -Wextra -Wpedantic -Werror`。没有 `cc` 时可以执行 `make CC=gcc`。无需 sudo，不修改系统配置。

## 运行现象

模拟温度依次为 `25,42,27,28,29,46,26,27,49,26,51,25` °C。默认阈值为 40 °C，事件发生在第 2、6、9、11 帧。

| 事件帧 | 快照保留的帧序号 | 默认上下文窗口 |
| --- | --- | --- |
| 2 | 1、2 | 已有数据不足 4 帧时按实际数量保存 |
| 6 | 3、4、5、6 | 包含触发帧与最多 3 帧历史 |
| 9 | 6、7、8、9 | 同上 |
| 11 | 8、9、10、11 | 同上 |

最终实时环形缓冲区只剩 `9,10,11,12`，第 2 帧事件仍能输出第 1、2 帧，说明快照不再受实时覆盖影响。

```sh
# 本机 x64 结果：保存全部 4 个事件，退出状态为 0
./blackbox_demo/blackbox --budget 256

# 本机 x64 结果：预算恰好保留前三份，第 4 份被拒绝
./blackbox_demo/blackbox --budget 128

# 初次成功后模拟分配失败，历史快照仍完整
./blackbox_demo/blackbox --budget 256 --fail-after 1
```

后两条命令预期以非零状态退出，表示有事件未保存。故障注入不会故意耗尽系统内存。
结构大小由程序输出的 `sample_bytes` 和 `header_bytes` 决定，不应把某台机器的字节数当成所有目标平台的常量。

## 文件结构

```text
blackbox_demo/blackbox.c         完整 C 程序
blackbox_demo/test_blackbox.py  31 项行为检查
blackbox_demo/Makefile          编译与可选 sanitizer 入口
blackbox_demo/README.md         参数和内存管理说明
blackbox_demo/run_*.txt         Windows x64 原始运行记录
blackbox_demo/verification.txt  本机编译和检查记录
docs/                          研究报告
AI_COLLABORATION.md             AI 协作过程摘要
REVIEW.md                       实现与交付核对记录
.github/workflows/test.yml      Linux 编译与测试
```

## 验证范围

本地 Windows x64 / TinyCC 0.9.27 已通过全部 31 项行为检查。自动测试校验历史帧内容、顺序、预算边界、申请失败后的数据完整性、快照数量上限和非法参数。
GitHub Actions 已在 Ubuntu 24.04 上通过 GCC、Clang，以及 GCC 的 ASan/UBSan 构建与行为检查，具体提交和运行链接见 [VALIDATION.md](VALIDATION.md)。
鲁班猫实机尚未验证。Windows、Linux 自动测试和开发板实测属于不同证据，不能互相替代。

## 使用边界

快照仅保存在进程 RAM，程序退出后不保留，不具备断电保护。预算只约束快照申请字节数，不包含分配器元数据、固定缓冲区和整个进程占用。
采样、分配、复制和打印位于同一线程，本例不保证硬实时。严格时序应用应进一步评估后台处理和预分配快照池。

## 下载

可使用 GitHub 的 Code → Download ZIP 下载完整仓库，也可以单独下载上方报告。代码与运行记录不含个人姓名、学号或登录凭据。
