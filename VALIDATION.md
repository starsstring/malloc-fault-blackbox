# 验证记录

## Windows 阶段

2026-10-21，Windows x64 / TinyCC 0.9.27，本机编译及全部 31 项行为检查通过。
完整日志见 [verification.txt](blackbox_demo/verification.txt)，三种场景见 [blackbox_demo](blackbox_demo)。
`docs/` 中 Word、PDF 与 Markdown 报告是在这一阶段整理的版本。

## GitHub Linux 阶段

上传代码后新增 Linux 验证。源代码提交为 `9933916bd5b6bcba2ad2ddafb0eb80d997d27b72`，对应 [Actions 运行](https://github.com/starsstring/malloc-fault-blackbox/actions/runs/39547435366)。

| 环境 | 执行内容 | 结果 |
| --- | --- | --- |
| Ubuntu 24.04 / GCC | C11 严格警告编译，31 项行为检查 | 通过 |
| Ubuntu 24.04 / Clang | C11 严格警告编译，31 项行为检查 | 通过 |
| Ubuntu 24.04 / GCC ASan 与 UBSan | 地址和未定义行为诊断构建，31 项行为检查 | 通过 |

三个任务均通过 `sha256sum -c MANIFEST.sha256`，公开文件哈希与该提交的清单一致。
GCC、Clang 和 sanitizer 任务的成功状态已通过 GitHub Actions API 核对。

这些结果补充了报告成稿时尚未具备的 Linux 证据。运行记录是特定环境与测试输入的证据，不证明不存在任何其他缺陷。

## 尚未验证

鲁班猫开发板、真实外接传感器、真实断电、DMA 和硬实时延迟均未验证。
GitHub 公开仓库已建立，课程平台中的提交仍未执行。
