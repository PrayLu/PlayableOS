---
title: Data Architecture
id: ARC-003
version: 1.0.0
status: Draft
owner: PlayableOS
updated: 2026-07-02
category: Architecture
---

# Data Architecture

> 数据架构（Data Architecture）

> 本文档定义 PlayableOS 的核心数据对象、数据域、数据流与存储策略。

Data Architecture 不是数据库设计文档。

Data Architecture 定义的是：

> **整个系统如何组织、流转和治理数据。**

---

# 1. 为什么需要 Data Architecture？

PlayableOS 横跨多个 Engine：

- KPG
- PGE
- Runtime
- Capability Engine
- Assessment Engine

每个 Engine 都产生和消费数据。

如果没有统一 Data Architecture：

- 对象定义会重复
- 模块边界会模糊
- AI 无法稳定协作
- 数据无法追溯

因此。

PlayableOS 必须定义：

统一数据对象。

统一数据流。

统一数据边界。

---

# 2. Data Architecture 的位置

```text
Business Architecture

↓

System Architecture

↓

Data Architecture

↓

Engine Implementation
```

Data Architecture 回答：

> 系统里有哪些数据？

> 数据如何流动？

> 谁拥有数据？

> 谁只能读取数据？

---

# 3. Core Data Flow

PlayableOS 的核心数据流如下：

```text
Enterprise Knowledge

↓

Knowledge Object        （KPG 输出）

↓

Playable Blueprint      （PGE 输出）

↓

Behavior Event          （Runtime 输出）

↓

Capability Profile      （Capability Engine 输出）

↓

Organization Analytics  （Dashboard 输出）
```

这是 PlayableOS 的主数据管道（Primary Data Pipeline）。

---

# 4. Core Data Objects

PlayableOS 定义六个核心数据对象。

## 4.1 Knowledge Object

来源：

KPG。

定义：

企业知识的标准数字实体。

详见：

`30_AI/32_KPG_Specification.md` Chapter 6。

---

## 4.2 Knowledge Unit

来源：

KPG。

定义：

Knowledge Object 的最小知识单元。

详见：

`30_AI/32_KPG_Specification.md` Chapter 7。

---

## 4.3 Playable Blueprint

来源：

PGE。

定义：

一次能力成长体验的标准设计对象。

Runtime 的唯一输入。

PGE 也称 Playable Package。

详见：

`30_AI/31_PGE_Specification.md` Chapter 8。

---

## 4.4 Behavior Event

来源：

Runtime。

定义：

员工在训练过程中产生的原子行为记录。

例如：

- 选择
- 对话
- 失败
- 重试
- 完成

Behavior Event 是能力形成的原始数据。

---

## 4.5 Capability Profile

来源：

Capability Engine。

定义：

员工或组织的能力画像。

包括：

- 能力等级
- 优势能力
- 待提升能力
- 成长趋势
- 推荐训练

---

## 4.6 Assessment Result

来源：

Assessment Engine。

定义：

单次训练的能力评估结果。

包括：

- 行为分析
- 能力变化
- 反馈建议
- 成长路径

---

# 5. Data Domains

PlayableOS 数据分为九个域（Data Domain）。

| Domain | 说明 | 主要生产者 | 主要消费者 |
|--------|------|-----------|-----------|
| Knowledge Data | 企业知识 | KPG | PGE / Search / Agent |
| Playable Data | 训练设计 | PGE | Runtime / Assessment |
| Behavior Data | 用户行为 | Runtime | Capability / Assessment |
| Capability Data | 能力画像 | Capability Engine | Dashboard / PGE |
| Organization Data | 组织信息 | Application | 全系统 |
| Analytics Data | 分析指标 | Analytics | Dashboard |
| Prompt Data | Prompt 模板 | Engineering | AI Engine / Agent |
| Model Data | 模型配置 | Engineering | AI Engine |
| Asset Data | 媒体资源 | Upload / KPG | Runtime / Knowledge |

每个 Domain 拥有独立存储策略。

但共享统一 Identity 与 Version 规范。

---

# 6. Data Ownership

每个 Engine 只拥有特定数据。

## KPG 拥有

- Knowledge Object
- Knowledge Unit
- Knowledge Graph

KPG 不拥有 Playable Blueprint。

---

## PGE 拥有

- Playable Blueprint

PGE 不直接写入 Behavior Data。

PGE 不直接访问 Organization Database。

---

## Runtime 拥有

- Session State
- Behavior Event
- Runtime Log

Runtime 不修改 Blueprint。

---

## Capability Engine 拥有

- Capability Profile
- Skill Graph
- Growth Path

---

## Assessment Engine 拥有

- Assessment Result
- Feedback Record

Assessment 可读取 Blueprint 与 Behavior。

但不得修改 Blueprint。

---

# 7. Data Boundaries

模块之间不得直接访问彼此数据库。

统一通过：

```text
Service

↓

API

↓

Event
```

进行数据交换。

禁止：

```text
Module A

↓

直接读写

↓

Module B Database
```

Blueprint 是 Immutable 对象。

Behavior Event 是 Append-only 对象。

Knowledge Object 通过 Version 演化。

---

# 8. Event-Driven Data Flow

PlayableOS 采用事件驱动数据流。

核心事件包括：

| Event | 生产者 | 数据 |
|-------|--------|------|
| KnowledgeUploaded | Application | 原始文件 |
| KnowledgeParsed | KPG | Knowledge Object |
| PlayableGenerated | PGE | Playable Blueprint |
| PlayablePublished | Application | Blueprint 版本 |
| PlayableStarted | Runtime | Session |
| BehaviorCollected | Runtime | Behavior Event |
| CapabilityUpdated | Capability Engine | Capability Profile |
| AssessmentCompleted | Assessment Engine | Assessment Result |

Event 是跨 Engine 协作的唯一方式。

---

# 9. Storage Strategy

Data Architecture 不规定具体数据库选型。

但规定存储原则。

## 9.1 Structured Data

Knowledge Object。

Playable Blueprint。

Capability Profile。

使用结构化存储。

支持：

查询。

版本。

关系。

---

## 9.2 Event Data

Behavior Event。

Runtime Log。

System Event。

使用事件存储。

支持：

Append-only。

时间序列。

高吞吐。

---

## 9.3 Asset Data

图片。

视频。

音频。

文档。

使用对象存储。

Knowledge Object 与 Blueprint 仅保存引用。

---

## 9.4 Analytics Data

Dashboard 指标。

训练统计。

能力趋势。

使用分析型存储。

支持：

聚合。

报表。

实时查询。

---

# 10. Version & Lifecycle

所有核心对象支持版本管理。

| Object | 版本策略 |
|--------|---------|
| Knowledge Object | 修改产生新版本，旧版本 Archive |
| Playable Blueprint | Publish 后 Immutable，优化产生新版本 |
| Capability Profile | 持续更新，保留历史快照 |
| Behavior Event | 不可修改，不可删除（合规策略除外） |

---

# 11. Multi-Tenancy

PlayableOS 支持企业隔离（Enterprise Isolation）。

所有数据对象必须包含：

- enterpriseId

企业之间：

数据完全隔离。

权限完全隔离。

Analytics 完全隔离。

---

# 12. Design Principles

Data Architecture 遵循：

- Object First（对象优先）
- Single Source of Truth（单一事实来源）
- Immutable Blueprint（Blueprint 不可变）
- Event Driven（事件驱动）
- Domain Separation（域分离）
- Enterprise Isolation（企业隔离）
- Version Traceable（版本可追溯）

---

# 13. References

- `20_Architecture/20_PlayableOS_Architecture.md`
- `20_Architecture/21_System_Architecture.md`
- `20_Architecture/23_Runtime_Architecture.md`
- `30_AI/32_KPG_Specification.md`
- `30_AI/31_PGE_Specification.md`

---

# One Sentence

> **Data Architecture 定义 PlayableOS 的数据语言。**

> **所有 Engine 通过统一数据对象协作，而不是通过共享数据库耦合。**
