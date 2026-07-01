---
title: Knowledge Processing Engine Specification
id: AI-003
version: 1.0.0
status: Draft
owner: PlayableOS
updated: 2026-07-02
category: AI
---

# Knowledge Processing Engine Specification

> Knowledge Processing Engine（KPG）

> KPG 是 PlayableOS 的知识处理引擎。

> 它负责将企业原始知识转换成 AI 可以理解、PGE 可以推理的标准知识对象（Knowledge Object）。

---

# Chapter 1. Definition

## 1.1 为什么需要 KPG？

企业知识从来不是标准化的。

企业每天产生：

- PPT
- PDF
- Word
- Excel
- 视频
- 音频
- 企业 Wiki
- 飞书文档
- 邮件
- SOP
- CRM
- ERP
- 图片

这些都是：

知识载体（Carrier）。

不是：

知识本身。

如果 PGE 直接处理这些内容。

那么：

PGE 必须理解：

几十种文件格式。

几十种文档结构。

几十种表达方式。

整个系统会高度耦合。

因此。

PlayableOS 将知识处理独立出来。

形成：

Knowledge Processing Engine（KPG）。

---

## 1.2 KPG 的定义

KPG 定义为：

> **负责理解、解析、结构化企业知识，并生成统一 Knowledge Object 的 AI 引擎。**

KPG 不负责：

生成体验。

KPG 不负责：

训练能力。

KPG 只负责：

把知识变成知识对象。

---

## 1.3 KPG 在系统中的位置

```
Enterprise Knowledge

↓

KPG

↓

Knowledge Object

↓

PGE

↓

Playable Blueprint
```

PGE 永远不直接处理：

PPT。

PDF。

Word。

视频。

它只处理：

Knowledge Object。

---

## 1.4 KPG 的使命

一句话：

> **让所有企业知识，都拥有统一的数据结构。**

Knowledge 不再依赖：

文件。

页面。

章节。

而依赖：

Knowledge Object。

---

# Chapter 2. Carrier Layer

## Carrier（知识载体）

Carrier 是知识的表现形式。

例如：

PPT。

PDF。

Markdown。

视频。

图片。

Excel。

网页。

数据库。

Carrier 可以不断增加。

Knowledge Object 保持稳定。

因此：

Carrier 与 Knowledge 解耦。

---

# Chapter 3. Knowledge Object

Knowledge Object 是整个 PlayableOS 最基础的数据对象。

PGE。

Agent。

Assessment。

Runtime。

全部围绕：

Knowledge Object 工作。

Knowledge Object 是：

Knowledge Layer 的唯一标准对象。

---

## 3.1 Knowledge Object Structure

Knowledge Object 包括：

```text
Knowledge Object

├── Metadata
├── Knowledge Type
├── Knowledge Units
├── Knowledge Relations
├── Knowledge Intent
├── Context
└── Assets
```

Knowledge Object 不保存文件。

只保存：

知识结构。

---

## 3.2 Metadata

Metadata 包括：

- ID
- Version
- Enterprise
- Language
- Source
- Author
- Created Time
- Updated Time

用于：

管理。

追踪。

版本控制。

---

## 3.3 Knowledge Type

KPG 自动识别：

Concept

Rule

Process

Skill

Case

Scenario

Value

Strategy

Knowledge Type 决定后续推理路径。

---

## 3.4 Knowledge Units

Knowledge 被拆分成多个：

Knowledge Unit。

Knowledge Unit 是：

Knowledge Layer 的最小处理单元。

例如：

一份 SOP。

可以拆成：

多个步骤。

一份 PPT。

可以拆成：

多个知识单元。

而不是：

一页 PPT。

---

## 3.5 Knowledge Relations

Knowledge Unit 之间。

存在关系。

例如：

依赖。

顺序。

包含。

引用。

冲突。

Knowledge Object 自动形成：

Knowledge Graph。

---

## 3.6 Knowledge Intent

Knowledge 不只是内容。

还拥有：

Intent。

例如：

解释。

规范。

训练。

提醒。

启发。

指导。

Knowledge Intent 将作为：

PGE 推理的重要输入。

---

## 3.7 Context

Knowledge Context 包括：

行业。

岗位。

部门。

企业文化。

使用场景。

Knowledge 永远不是孤立存在。

---

## 3.8 Assets

Knowledge 引用：

图片。

视频。

表格。

音频。

外部资源。

Assets 保持独立存储。

Knowledge Object 仅保存引用关系。

---

# Chapter Summary

KPG 的输出不是文件。

不是文本。

不是课程。

而是：

Knowledge Object。

Knowledge Object 将成为：

整个 PlayableOS 的知识标准。

PGE。

Agent。

Runtime。

Assessment。

全部建立在这一标准之上。

---

# Chapter 4. Knowledge Understanding

> Knowledge Understanding 是 KPG 的核心能力。

> KPG 并不是读取文档，而是建立企业知识的数字化理解模型（Knowledge Model）。

---

# 4.1 为什么需要 Knowledge Understanding？

企业中的知识天然是非结构化的。

例如：

一份 PPT。

有标题。

有图片。

有流程。

有案例。

有备注。

有动画。

一份视频。

包含：

画面。

声音。

字幕。

情绪。

演示动作。

一份 SOP。

包含：

步骤。

规则。

注意事项。

例外情况。

AI 如果只是读取文字。

并不能真正理解知识。

因此。

KPG 的第一职责不是 Parsing（解析）。

而是 Understanding（理解）。

---

# 4.2 Knowledge Understanding 的目标

Knowledge Understanding 回答四个问题：

**第一：这是什么知识？**

Knowledge Type

---

**第二：这份知识在讲什么？**

Knowledge Meaning

---

**第三：为什么要讲？**

Knowledge Intent

---

**第四：哪些内容真正值得训练？**

Training Value

Knowledge Understanding 最终输出的是：

Knowledge Model。

而不是文本。

---

# 4.3 Knowledge Model

每一个 Knowledge Object 都对应一个 Knowledge Model。

Knowledge Model 包括：

```text
Knowledge Model

├── Semantic Meaning（语义）
├── Structure（结构）
├── Intent（意图）
├── Context（上下文）
├── Relation（关系）
├── Importance（重要性）
└── Training Value（训练价值）
```

Knowledge Model 是 PGE 推理的直接输入。

---

# 4.4 Semantic Understanding（语义理解）

KPG 首先理解：

知识真正表达的含义。

例如：

一句话：

"客户永远是第一位。"

AI 不应理解成：

一句企业口号。

而应理解为：

一种价值观。

一种行为原则。

一种决策依据。

因此。

Semantic Understanding 关注：

意义。

不是文字。

---

# 4.5 Structure Understanding（结构理解）

知识天然具有结构。

例如：

流程。

树状。

时间线。

矩阵。

因果关系。

比较关系。

KPG 自动识别：

知识如何组织。

而不是：

文档如何排版。

---

# 4.6 Intent Understanding（意图理解）

同样一句知识。

意图可能不同。

例如：

"必须在24小时内回复客户。"

Intent 可能是：

规范。

要求。

提醒。

服务标准。

不同 Intent。

决定后续训练方式。

因此。

Intent 是 Knowledge Model 的重要组成部分。

---

# 4.7 Context Understanding（上下文理解）

知识必须结合上下文。

例如：

"审批。"

不同部门。

不同企业。

完全不同。

Context 包括：

行业。

岗位。

组织。

业务流程。

角色关系。

Knowledge 永远不脱离 Context。

---

# 4.8 Relation Understanding（关系理解）

知识之间存在大量关系。

例如：

产品知识。

依赖：

行业知识。

销售流程。

依赖：

产品知识。

企业文化。

影响：

管理行为。

KPG 自动构建：

Knowledge Graph。

帮助 AI 建立整体理解。

---

# 4.9 Importance Evaluation（重要性评估）

并不是所有知识都同样重要。

KPG 自动评估：

每一个 Knowledge Unit 的重要程度。

例如：

企业使命。

重要性：

★★★★★

案例中的背景介绍。

重要性：

★★

重要性影响：

训练优先级。

Scenario 权重。

反馈策略。

---

# 4.10 Training Value Evaluation（训练价值评估）

这是 KPG 最独特的一项能力。

不是所有知识。

都适合训练。

例如：

公司成立时间。

适合记忆。

不适合体验。

客户异议处理。

非常适合体验。

KPG 为每个 Knowledge Unit 计算：

Training Value。

Training Value 越高。

越优先交给 PGE。

Training Value 包括：

* 是否需要决策
* 是否涉及行为
* 是否具有真实场景
* 是否可以模拟
* 是否能够评估

Training Value 是 PGE 是否生成 Playable 的重要依据。

---

# 4.11 Knowledge Understanding Output

Knowledge Understanding 最终输出：

Knowledge Model。

Knowledge Model 包括：

```text
Knowledge Object

↓

Knowledge Model

├── Semantic Meaning
├── Structure
├── Intent
├── Context
├── Relation
├── Importance
└── Training Value
```

Knowledge Model 将进入：

Knowledge Reasoning Pipeline。

继续推理。

---

# 4.12 Design Principles

Knowledge Understanding 遵循：

第一：

理解意义。

不是读取文字。

第二：

理解结构。

不是理解页面。

第三：

理解意图。

不是理解标题。

第四：

理解关系。

不是理解章节。

第五：

理解训练价值。

不是理解知识数量。

---

# Chapter Summary

Knowledge Understanding 的目标不是数字化文档。

而是数字化知识。

KPG 输出的是：

Knowledge Model。

而不是文件内容。

Knowledge Model 将成为 PGE 所有能力推理与体验设计的基础。

---

# Chapter 5. Knowledge Reasoning

> Knowledge Reasoning 是 KPG 的核心推理能力。

> KPG 不只是理解知识，而是判断知识如何帮助员工成长。

---

# 5.1 为什么需要 Knowledge Reasoning？

Knowledge Understanding 回答：

> 这是什么知识？

Knowledge Reasoning 回答：

> 这份知识应该如何用于成长？

因此。

Reasoning 并不是继续分析文本。

而是开始分析：

教育价值。

训练价值。

成长价值。

Knowledge 从这里开始。

真正进入：

Playable Pipeline。

---

# 5.2 Knowledge Reasoning 的目标

Knowledge Reasoning 的目标只有一句话：

> **识别知识真正的成长价值。**

同样一份知识。

不同岗位。

不同企业。

不同员工。

成长价值可能完全不同。

因此。

Knowledge Reasoning 必须结合：

知识。

企业。

岗位。

共同推理。

---

# 5.3 Instructional Reasoning

PlayableOS 提出：

Instructional Reasoning。

定义：

> **AI 站在教学设计者视角，对知识进行成长价值推理的过程。**

Instructional Reasoning 不关心：

知识有没有写清楚。

而关心：

员工应该经历什么。

---

# 5.4 Training Value Reasoning

KPG 判断：

哪些 Knowledge Unit。

真正值得训练。

例如：

制度编号。

Training Value：

低。

客户异议。

Training Value：

高。

价值观冲突。

Training Value：

极高。

Training Value 影响：

PGE 是否生成：

Playable。

---

# 5.5 Difficulty Reasoning

KPG 自动评估：

知识复杂度。

例如：

知识点数量。

知识依赖关系。

概念抽象程度。

决策复杂度。

复杂度。

影响：

训练方式。

体验长度。

难度等级。

---

# 5.6 Knowledge Reasoning Output

Knowledge Reasoning 最终输出：

Knowledge Intelligence。

包括：

Training Value

Difficulty

Knowledge Graph

Knowledge Intelligence。

交给：

PGE。

继续设计体验。

---

# 5.7 Design Principles

Knowledge Reasoning 遵循：

第一：

成长优先。

第二：

训练优先。

第三：

能力优先。

第四：

真实优先。

第五：

教育优先。

Reasoning 的目标。

不是总结知识。

而是设计成长。

---

# Chapter Summary

Knowledge Reasoning 是 KPG 的决策核心。

Knowledge Understanding。

建立：

Knowledge Model。

Knowledge Reasoning。

建立：

Knowledge Intelligence。

Knowledge Intelligence。

成为：

PGE 的输入。

PGE 在此基础上。

完成 Capability Hint、Scenario Potential、Interaction Potential、Assessment Potential 等体验设计推理。

---

# Chapter 6. Knowledge Object Architecture

> **Knowledge Object** is the canonical representation of enterprise knowledge in PlayableOS.

Knowledge Object 是 PlayableOS 中最核心的数据对象之一。

它不是文档。

不是 PPT。

不是 PDF。

不是数据库记录。

而是：

> **一个拥有语义（Semantic）、结构（Structure）、上下文（Context）、关系（Relation）和生命周期（Lifecycle）的知识实体（Living Knowledge Entity）。**

Knowledge Object 是整个 Knowledge Layer 唯一认可的标准对象。

---

# 6.1 Background

企业每天都在产生知识。

这些知识来自：

- PPT
- PDF
- Word
- 视频
- SOP
- 企业 Wiki
- CRM
- ERP
- Excel
- 音频
- 图片

这些都是知识的载体（Carrier）。

不是知识本身。

Knowledge Processing Engine（KPG）的职责不是管理这些载体。

而是把这些载体中的知识抽取出来。

统一转换为：

**Knowledge Object。**

因此：

```text
Carrier

↓

Knowledge Processing Engine

↓

Knowledge Object
```

Knowledge Object 是：

Knowledge Layer 与 Training Layer 之间唯一允许流通的数据对象。

---

# 6.2 Design Goals

Knowledge Object Architecture 的目标如下。

## Goal 1

统一企业知识表达。

任何来源的知识。

最终都拥有统一的数据模型。

---

## Goal 2

Knowledge 与 Carrier 解耦。

Knowledge Object 永远不知道：

自己来自 PPT。

还是视频。

还是 Wiki。

Carrier 只是来源。

Knowledge 才是主体。

---

## Goal 3

成为整个系统的共同语言。

Knowledge Object 被：

- PGE
- Runtime
- Agent
- Search
- Dashboard

共同使用。

整个系统围绕同一种知识对象协作。

---

## Goal 4

支持 AI Native。

Knowledge Object 天然适合：

LLM

Knowledge Graph

Semantic Search

Agent Collaboration

Retrieval

Reasoning

而不是为了数据库设计。

---

## Goal 5

支持长期演化。

Knowledge Object 可以：

持续升级。

持续补充。

持续建立关系。

持续版本管理。

它拥有自己的生命周期。

---

# 6.3 Definition

Knowledge Object 定义如下：

> **Knowledge Object 是企业知识在 PlayableOS 中的数字实体。**

它描述的是：

知识是什么。

而不是：

知识如何训练。

Training。

属于：

PGE。

Knowledge Object。

属于：

KPG。

两者边界必须严格隔离。

---

# 6.4 Architecture

Knowledge Object Architecture 包括五层。

```text
Knowledge Object

├── Identity Layer
│
├── Semantic Layer
│
├── Structural Layer
│
├── Resource Layer
│
└── Metadata Layer
```

其中：

Semantic Layer 是整个对象的核心。

---

# 6.5 Identity Layer

Identity 描述：

Knowledge Object 自身。

包括：

- Object ID
- Version
- Status
- Created Time
- Updated Time

Identity 永远唯一。

Knowledge Object 不允许共享 ID。

任何修改。

都会产生新的 Version。

Identity 不参与知识推理。

仅负责生命周期管理。

---

# 6.6 Semantic Layer

Semantic Layer 是 Knowledge Object 最重要的一层。

它回答：

> **这份知识真正表达了什么？**

Semantic Layer 包括：

```text
Semantic Layer

├── Meaning
├── Type
├── Intent
├── Context
├── Concepts
├── Constraints
├── Decisions
└── Relations
```

Semantic Layer 不保存文字。

它保存：

知识意义。

因此。

即使：

PPT。

Word。

视频。

表达不同。

Semantic Layer 保持一致。

---

## 6.6.1 Meaning

Knowledge 的核心含义。

例如：

"客户投诉应先安抚情绪。"

Meaning：

不是：

一句话。

而是一条：

可理解知识。

---

## 6.6.2 Type

Knowledge 类型。

例如：

Concept

Rule

Process

Skill

Case

Scenario

Strategy

Value

Type 是：

Knowledge 的天然属性。

---

## 6.6.3 Intent

Knowledge 为什么存在。

例如：

Explain

Guide

Warn

Standardize

Inspire

Analyze

Intent 用于表达：

作者希望知识发挥什么作用。

---

## 6.6.4 Context

Knowledge 从来不是孤立存在。

Context 包括：

行业。

部门。

岗位。

组织。

业务流程。

Knowledge 脱离 Context。

意义可能完全改变。

---

## 6.6.5 Concepts

Knowledge 中涉及的重要概念。

例如：

销售。

客户。

需求。

异议。

成交。

Concept 是：

Knowledge Graph 的节点来源。

---

## 6.6.6 Constraints

Knowledge 中包含的限制条件。

例如：

必须。

禁止。

不得。

只能。

Constraint 对：

PGE。

Runtime。

Agent。

都具有重要意义。

---

## 6.6.7 Decisions

Knowledge 中包含：

哪些需要判断？

哪些需要选择？

哪些存在多个方案？

Decision 将成为：

Playable 决策点的重要来源。

---

## 6.6.8 Relations

Knowledge 与其他 Knowledge Object 的关系。

例如：

依赖。

引用。

补充。

冲突。

扩展。

Knowledge Network。

由 Relations 构建。

---

# 6.7 Structural Layer

Structural Layer 描述：

知识如何组织。

而不是：

知识表达什么。

包括：

```text
Structure

├── Knowledge Units
├── Hierarchy
├── Workflow
├── Timeline
├── Matrix
├── Checklist
└── Decision Tree
```

Structure 是：

Knowledge 的组织方式。

不是：

Playable 的组织方式。

---

# 6.8 Resource Layer

Resource Layer 保存：

Knowledge 引用的资源。

包括：

- 图片
- 视频
- 音频
- 图表
- 表格
- 附件

Resource 永远不参与推理。

只提供引用。

因此：

Knowledge 与 Resource 解耦。

---

# 6.9 Metadata Layer

Metadata 保存：

管理信息。

例如：

标题。

作者。

企业。

标签。

权限。

更新时间。

Metadata 不参与：

Knowledge Meaning。

---

# 6.10 Lifecycle

Knowledge Object 生命周期如下：

```text
Create

↓

Understand

↓

Normalize

↓

Publish

↓

Reference

↓

Update

↓

Version

↓

Archive
```

Knowledge Object 是持续演化对象。

不是一次性数据。

---

# 6.11 Design Principles

Knowledge Object 遵循以下原则：

## Knowledge First

永远描述知识。

不描述文件。

---

## Semantic First

语义高于文本。

Meaning 高于内容。

---

## Structure First

结构独立于表达。

---

## Context First

知识必须拥有上下文。

---

## Immutable

Knowledge Object 一经发布。

不可修改。

任何更新。

产生新的 Version。

---

## AI Native

Knowledge Object 天然适合：

AI 理解。

AI 推理。

AI 协作。

---

## Decoupled

Knowledge Layer 与 Training Layer 完全解耦。

KPG 永远不知道：

Playable。

PGE 永远不知道：

PPT。

---

# 6.12 References

依赖：

- 20_Architecture/21_System_Architecture.md
- 30_AI/31_PGE_Specification.md

---

# One Sentence

> **Knowledge Object is the digital life of enterprise knowledge.**

> **Knowledge Object 不是一份文档。**

> **它是企业知识在 PlayableOS 中的数字生命体。**

---

# Chapter 7. Knowledge Unit Architecture

> Knowledge Unit 是 PlayableOS 中最小的知识处理单元（Atomic Knowledge Unit）。

---

# 7.1 Definition

Knowledge Unit 是一段不可再拆分、具有独立意义的知识。

例如：

- 一个概念
- 一条规则
- 一个步骤
- 一个案例
- 一个决策点

Knowledge Unit 是 KPG 的最小处理单位。

---

# 7.2 Why

PPT 不是训练对象。

PDF 不是训练对象。

Knowledge Object 也不是训练对象。

真正参与 AI 推理的是：

```text
Knowledge Object

↓

Knowledge Unit

↓

PGE
```

---

# 7.3 Principles

一个 Knowledge Unit 必须：

- 表达一个完整知识点
- 具有独立语义
- 可被单独引用
- 可建立关系
- 可独立版本管理

---

# 7.4 Structure

```text
Knowledge Unit

├── ID
├── Content
├── Type
├── Intent
├── Context
└── Relations
```

---

# 7.5 Examples

一句规则：

> 客户投诉时，应先回应情绪，再解决问题。

一个流程步骤：

> 提交申请后等待主管审批。

一个概念：

> 什么是客户成功？

它们都属于一个独立的 Knowledge Unit。

---

# 7.6 Design Principles

Knowledge Unit 遵循：

- Atomic（原子化）
- Independent（独立）
- Reusable（可复用）
- Traceable（可追溯）

---

# Chapter Summary

Knowledge Object 是知识集合。

Knowledge Unit 是知识原子。

KPG 围绕 Knowledge Unit 工作。

PGE 基于 Knowledge Unit 设计能力成长体验。

---

# Chapter 8. Processing Pipeline

> Processing Pipeline 定义 KPG 如何将企业原始知识转换为标准 Knowledge Object。

---

# 8.1 Overview

KPG 采用统一处理流程。

```text
Carrier

↓

Parse

↓

Extract

↓

Normalize

↓

Knowledge Object

↓

Publish
```

每一步职责单一。

---

# 8.2 Parse

解析知识载体。

支持：

- PPT
- PDF
- Word
- Markdown
- Video
- Audio
- Wiki

输出原始内容。

---

# 8.3 Extract

提取知识内容。

包括：

- 文本
- 图片
- 表格
- 标题
- 流程
- 图示

统一转换为可处理的数据。

---

# 8.4 Normalize

知识标准化。

完成：

- 类型识别
- 结构整理
- Context 补充
- Unit 拆分
- Relation 建立

最终生成：

Knowledge Object。

---

# 8.5 Publish

Knowledge Object 发布到 Knowledge Layer。

供：

- PGE
- Search
- Agent
- Runtime

统一引用。

KPG 生命周期到此结束。

---

# 8.6 Design Principles

Processing Pipeline 遵循：

- One Input
- One Output
- Deterministic
- Traceable
- Extensible

---

# Chapter Summary

KPG 不负责训练。

KPG 只负责：

```text
Enterprise Knowledge

↓

Knowledge Object
```

Knowledge Object 是 KPG 唯一输出。

也是 PGE 唯一输入。
