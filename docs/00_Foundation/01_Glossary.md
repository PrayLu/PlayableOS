---
title: PlayableOS Glossary
id: DOC-001
version: 1.0.0
status: Active
owner: PlayableOS
updated: 2026-07-01
category: Foundation
---

# PlayableOS Glossary

> PlayableOS 官方术语词典（Official Glossary）

本词典定义 PlayableOS 所有核心概念。

所有产品文档、技术文档、PRD、代码、Prompt、AI Agent 均应遵循本词典。

任何术语仅允许在本词典进行正式定义。

其它文档只能引用。

---

# A

## Agent（智能体）

一种具有自主思考、执行和协作能力的 AI 单元。

在 PlayableOS 中，每个 Agent 负责一个明确职责，例如：

- Knowledge Agent
- Capability Agent
- Scenario Agent
- Mechanic Agent
- Assessment Agent

Agent 共同组成 PGE。

---

## Assessment（评估）

对员工行为进行分析，并判断能力形成程度的过程。

Assessment 不等于考试。

Assessment 的目标是回答：

> 员工是否真正获得了能力？

Assessment 的输出包括：

- Score（评分）
- Capability Level（能力等级）
- Feedback（反馈）
- Growth Suggestion（成长建议）

---

# C

## Capability（能力）

员工在真实工作场景中稳定完成任务的能力。

能力不是知识。

能力是：

> 知道如何做。

并且：

> 能够持续做好。

例如：

销售能力。

并不是：

知道产品。

而是：

能够持续完成销售。

---

## Capability Growth（能力成长）

员工能力持续提升的过程。

PlayableOS 的最终目标不是完成学习。

而是促进能力成长。

---

## Capability Mapping（能力映射）

将企业知识映射到训练目标能力的过程。

例如：

销售异议处理

↓

异议处理能力

企业文化

↓

价值观实践能力

SOP

↓

流程执行能力

---

# D

## Decision Engine（决策引擎）

PGE 内部负责做生成决策的核心模块。

Decision Engine 负责判断：

- 训练什么能力？
- 使用什么场景？
- 使用什么 Mechanic？
- 如何评估？

Decision Engine 是 PGE 的核心。

---

# G

## Grammar（语法）

Grammar 指一种稳定、可复用、可推导的生成规则。

Grammar 不等于 Prompt。

Grammar 是：

AI 如何理解知识。

AI 如何组织训练。

AI 如何生成 Playable。

---

# I

## Interaction（交互）

员工与 Playable 之间发生的所有行为。

例如：

点击。

拖拽。

排序。

对话。

探索。

多人协作。

交互不是动画。

交互是训练行为。

---

# K

## Knowledge（知识）

企业内部所有能够帮助员工成长的信息。

包括：

- PPT
- PDF
- Word
- SOP
- 制度
- 案例
- 产品资料
- 企业文化
- 培训课程
- 视频
- 音频

Knowledge 是 PlayableOS 的输入。

---

## KPG（Knowledge Playability Grammar）

知识可玩化语法。

定义：

Knowledge Playability Grammar 是一套将企业知识映射为 Playable 的规则体系。

KPG 不负责生成。

KPG 负责：

理解。

推导。

选择。

KPG 是 PGE 的理论基础。

---

# M

## Mechanic（机制）

Playable 中用于驱动训练的交互机制。

Mechanic 回答：

> 用户如何参与？

常见 Mechanic：

- Choice
- Dialogue
- Drag
- Sort
- Puzzle
- Timer
- Boss Battle
- Collaboration

Mechanic 不等于小游戏。

Mechanic 是训练方式。

---

# P

## PGE（Playable Generation Engine）

可玩化生成引擎。

PlayableOS 的核心 AI 引擎。

负责：

Knowledge

↓

Playable

PGE 负责：

- 理解知识
- 识别能力
- 选择 Mechanic
- 生成训练
- 建立评估

PGE 是整个产品最核心的系统。

---

## Playable（可玩化内容）

Playable 是一种可参与、可互动、可训练、可评估的能力成长体验。

Playable 不是游戏。

Playable 的目标不是娱乐。

而是：

形成能力。

Playable 可以包括：

- AI 对话
- 情景决策
- 剧情挑战
- 流程闯关
- Boss Battle
- 模拟经营
- 多人协作

任何能够促进能力成长的互动体验，都可以称为 Playable。

---

## Playable Package

PGE 输出的标准数据对象。

Playable Package 包括：

- Metadata
- Capability
- Scenario
- Mechanic
- Interaction
- Assessment
- Assets

Playable Package 是前端渲染唯一数据源。

---

# S

## Scenario（场景）

员工训练能力时所处的模拟工作环境。

例如：

客户投诉。

销售拜访。

安全事故。

团队会议。

绩效反馈。

招聘面试。

Scenario 回答：

> 这项能力将在什么地方被使用？

---

## Scenario Mapping（场景映射）

将目标能力映射到真实工作场景。

例如：

沟通能力

↓

客户沟通。

反馈能力

↓

绩效面谈。

领导力

↓

团队管理。

---

# T

## Training（训练）

通过可重复体验促进能力形成的过程。

Training 不等于学习。

Training 强调：

实践。

反馈。

重复。

成长。

---

# W

## Workflow（工作流）

PGE 内部执行生成任务的流程。

例如：

Knowledge

↓

Parser

↓

Capability

↓

Scenario

↓

Mechanic

↓

Playable

↓

Assessment

Workflow 定义系统如何运行。

---

# Appendix A：官方缩写

| 缩写 | 全称 | 中文 |
|------|------|------|
| PGE | Playable Generation Engine | 可玩化生成引擎 |
| KPG | Knowledge Playability Grammar | 知识可玩化语法 |
| ECM | Enterprise Capability Model | 企业能力模型 |
| AI | Artificial Intelligence | 人工智能 |

---

# Appendix B：术语引用规范

所有文档引用术语时，应遵循以下格式：

第一次出现：

> 可玩化生成引擎（Playable Generation Engine，PGE）

后续统一：

> PGE

不得使用：

- Play Engine
- Game Engine
- Training Engine

所有术语必须保持一致。

---

# Appendix C：未来新增术语

随着产品演进，本词典将持续扩展。

新增术语需满足：

1. 在产品中具有长期稳定意义。
2. 可在多个文档中复用。
3. 不与已有术语冲突。
4. 经团队确认后加入词典。

---

> **Glossary 的使命不是解释名词，而是统一语言。**

统一语言，才能统一思维。

统一思维，才能统一产品。

统一产品，才能统一组织。
