---
title: Engineering Principles
id: DOC-003
version: 1.0.0
status: Active
owner: PlayableOS
updated: 2026-07-01
category: Foundation
---

# Engineering Principles

> PlayableOS 工程开发原则（Engineering Principles）

本原则定义 PlayableOS 的工程哲学、研发流程和 AI 协作方式。

所有代码、架构设计、AI 开发、技术决策均应遵循本原则。

当工程效率与工程原则发生冲突时，应优先遵循工程原则。

---

# 为什么需要 Engineering Principles？

AI 正在改变软件开发。

未来的软件开发，不再只是程序员写代码。

而是：

AI 负责生成。

工程师负责判断。

Documentation 负责定义。

因此：

工程体系必须重新设计。

PlayableOS 从第一天开始，就是一家 AI Native Company。

---

# Principle 01

## Documentation Before Development

> **先文档，后开发。**

任何功能进入开发之前。

必须存在对应 Documentation。

包括：

- 背景
- 目标
- 产品原则
- 数据结构
- API
- 流程

没有 Documentation。

不得开始开发。

Documentation 是唯一事实来源（Single Source of Truth）。

---

# Principle 02

## Specification Before Code

> **先规范，再代码。**

不要直接写代码。

先定义：

系统应该是什么。

再实现：

系统如何运行。

代码只是 Specification 的实现。

不是 Specification 本身。

---

# Principle 03

## AI First Development

> **AI 优先开发。**

任何开发任务。

默认流程：

Documentation

↓

AI 生成

↓

工程师 Review

↓

测试

↓

上线

不是：

工程师

↓

写代码

↓

AI 修改

AI 是第一开发者。

工程师是最终负责人。

---

# Principle 04

## Markdown Is The Source Of Truth

> **Markdown 是唯一事实来源。**

所有正式内容。

统一维护于 Markdown。

包括：

- 产品文档
- 技术规范
- API
- Prompt
- 架构
- PRD

HTML、PDF、Word、官网均由 Markdown 自动生成。

---

# Principle 05

## Repository Is The Company

> **仓库就是公司。**

Git Repository 不只是代码仓库。

它保存：

- 理论
- 产品
- 技术
- 文档
- Prompt
- UI
- Demo

未来任何成员加入项目。

第一件事：

不是开会。

而是阅读 Repository。

---

# Principle 06

## Everything Is Versioned

> **一切都需要版本。**

不仅代码需要版本。

Documentation。

Prompt。

Agent。

PRD。

Mermaid。

Design System。

都必须版本化。

统一采用：

Semantic Version。

例如：

```
1.0.0
```

---

# Principle 07

## Small Commits

> **小步提交。**

每一个 Commit 应聚焦一件事情。

例如：

新增一个模块。

完成一个章节。

修复一个问题。

禁止：

一次提交大量无关修改。

---

# Principle 08

## Build Modules, Not Pages

> **构建模块，而不是页面。**

页面会变化。

模块会复用。

优先设计：

Knowledge Parser。

Scenario Engine。

Assessment Engine。

而不是：

首页。

登录页。

Dashboard。

---

# Principle 09

## Structured Data First

> **结构化优先。**

所有 AI 输出。

首先应生成：

结构。

然后：

渲染。

例如：

Playable。

先生成：

Playable Package。

再生成：

UI。

不要：

直接输出 HTML。

---

# Principle 10

## JSON Is The Interface

> **JSON 是系统语言。**

模块之间。

统一使用 JSON 通信。

禁止：

直接拼接页面。

禁止：

直接输出字符串。

系统内部：

一切皆数据。

---

# Principle 11

## Engine Over Workflow

> **引擎优于流程。**

不要写：

固定流程。

要写：

可复用 Engine。

例如：

不要：

新人培训流程。

要：

Playable Engine。

以后：

所有训练。

都可复用。

---

# Principle 12

## Human Review Is Mandatory

> **人工审核不可省略。**

AI 可以生成：

代码。

文档。

Prompt。

SQL。

API。

但是：

最终发布。

必须经过人工确认。

AI 是助手。

不是最终责任人。

---

# Principle 13

## Prefer Reusable Components

> **优先复用。**

任何功能。

优先寻找：

已有模块。

不要：

重复开发。

PlayableOS 所有能力。

应沉淀为：

Component。

Engine。

Package。

---

# Principle 14

## Data Over Assumption

> **数据优于假设。**

任何产品优化。

优先依据：

真实数据。

而不是：

个人感觉。

例如：

训练完成率。

能力提升。

互动行为。

放弃率。

---

# Principle 15

## Measure Capability, Not Activity

> **衡量能力，而不是活跃度。**

不要关注：

学习时长。

点击次数。

课程完成率。

真正重要的是：

能力是否成长。

例如：

销售成交能力。

管理反馈能力。

风险判断能力。

---

# Principle 16

## Continuous Evolution

> **持续进化。**

系统不是一次完成。

每一次：

员工行为。

管理员修改。

AI 反馈。

都会帮助：

PGE。

持续优化。

---

# Principle 17

## Automation By Default

> **默认自动化。**

任何重复工作。

优先自动化。

例如：

文档生成。

代码格式化。

测试。

部署。

Documentation Website。

Release。

尽可能由系统完成。

---

# Principle 18

## Open Architecture

> **开放架构。**

所有核心模块。

保持低耦合。

例如：

Knowledge Parser。

Mechanic Engine。

Scenario Engine。

Assessment Engine。

可独立升级。

可独立替换。

---

# Principle 19

## AI Is A Team Member

> **AI 是团队成员。**

AI 不是工具。

AI 是研发团队的一部分。

AI 应参与：

需求分析。

产品设计。

技术方案。

代码生成。

测试。

文档维护。

Review。

未来每一个 AI Agent。

都拥有明确职责。

---

# Principle 20

## Build For Ten Years

> **以十年为尺度设计系统。**

PlayableOS 不追求：

最快上线。

而追求：

十年后依然可维护。

任何设计。

都应回答：

五年后还能继续扩展吗？

十年后还能继续演进吗？

如果不能。

重新设计。

---

# AI Native Development Workflow

```text
Idea

↓

Documentation

↓

Specification

↓

AI Generation

↓

Human Review

↓

Development

↓

Testing

↓

Deployment

↓

User Feedback

↓

Data Collection

↓

AI Optimization

↓

Next Version
```

这是 PlayableOS 默认开发流程。

任何新功能。

均应遵循。

---

# Repository Workflow

```text
Issue

↓

Discussion

↓

Documentation

↓

Commit

↓

Review

↓

Merge

↓

Release
```

所有工作。

围绕 Repository 展开。

---

# Engineering Checklist

每个功能上线前。

必须确认：

- 是否已有 Documentation？
- 是否符合 Product Principles？
- 是否符合 Engineering Principles？
- 是否支持版本管理？
- 是否采用结构化数据？
- 是否经过 AI 生成？
- 是否经过人工 Review？
- 是否支持未来扩展？
- 是否能够沉淀数据？
- 是否符合十年演进方向？

全部通过。

方可进入 Release。

---

# One Sentence

> **Documentation 定义系统。**

> **AI 构建系统。**

> **人负责系统。**
