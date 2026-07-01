---
title: System Architecture
id: ARC-002
version: 1.0.0
status: Active
owner: PlayableOS
updated: 2026-07-01
category: Architecture
---

# System Architecture

> PlayableOS 系统架构（System Architecture）

本文档定义 PlayableOS 的系统组成、模块边界以及模块之间的协作关系。

本架构描述的是软件系统，而不是部署架构。

---

# 1. 为什么需要 System Architecture？

Business Architecture 回答：

> 产品如何创造价值？

System Architecture 回答：

> 软件如何实现这些价值？

所有系统开发必须遵循本架构。

---

# 2. System Overview

PlayableOS 由七个核心系统组成。

```text
Client

↓

Application

↓

AI Engine

↓

Playable Engine

↓

Capability Engine

↓

Data Platform

↓

Infrastructure
```

---

# 3. Overall Architecture

```mermaid
flowchart TD

Client

↓

Application

↓

AIEngine

↓

PlayableRuntime

↓

CapabilityEngine

↓

DataPlatform

↓

Infrastructure
```

---

# 4. Client Layer（客户端）

## 职责

提供所有用户交互入口。

支持：

- Web
- Mobile
- Pad
- Future XR

---

### 用户角色

企业管理员

员工

培训负责人

部门负责人

企业管理层

系统管理员

---

### Client 不负责

业务逻辑

AI推理

数据库

权限管理

---

# 5. Application Layer（应用层）

Application Layer 是整个业务入口。

负责：

- 用户登录
- 企业管理
- 课程管理
- Playable发布
- Dashboard
- 权限控制
- Workflow

Application Layer 不负责 AI 推理。

---

## 子系统

### Organization Service

企业信息。

部门。

岗位。

组织架构。

---

### User Service

员工。

角色。

身份。

权限。

---

### Learning Service

训练任务。

训练计划。

训练历史。

---

### Dashboard Service

企业数据。

能力统计。

运营分析。

---

# 6. AI Engine（AI 引擎层）

AI Engine 是 PlayableOS 的智能核心。

负责：

Knowledge

↓

Playable

整个转换。

AI Engine 包括多个 Agent。

---

## Core Components

Knowledge Parser

Knowledge Analyzer

Capability Mapper

Scenario Engine

Mechanic Engine

PGE

Assessment Builder

Recommendation Engine

---

## 输入

Knowledge Package

---

## 输出

Playable Package

---

# 7. Playable Runtime（Playable 运行层）

负责真正运行 Playable。

包括：

剧情。

AI 对话。

Boss Battle。

多人协作。

模拟经营。

---

## Runtime Components

Dialogue Runtime

Scenario Runtime

Workflow Runtime

Battle Runtime

Simulation Runtime

Collaboration Runtime

---

Runtime 不负责生成。

只负责运行。

---

# 8. Capability Engine（能力引擎）

负责：

员工能力计算。

成长分析。

企业能力分析。

组织能力分析。

---

## 输出

Capability Report

Skill Graph

Growth Path

Learning Recommendation

---

# 9. Data Platform（数据平台）

统一管理所有数据。

包括：

Knowledge Data

Playable Data

Behavior Data

Capability Data

Organization Data

Analytics Data

Prompt Data

Model Data

---

## Data Platform 职责

统一存储。

统一查询。

统一分析。

统一治理。

---

# 10. Infrastructure（基础设施）

负责：

身份认证。

文件存储。

日志。

消息队列。

缓存。

部署。

监控。

CI/CD。

Infrastructure 不包含业务逻辑。

---

# 11. Core Engines

PlayableOS 核心包含六个 Engine。

```text
Knowledge Engine

↓

PGE

↓

Playable Engine

↓

Assessment Engine

↓

Capability Engine

↓

Recommendation Engine
```

Engine 之间保持低耦合。

通过标准接口通信。

---

# 12. Standard Data Flow

```mermaid
flowchart LR

Knowledge

-->Parser

-->Analyzer

-->Capability

-->Scenario

-->Mechanic

-->PGE

-->PlayablePackage

-->Runtime

-->BehaviorData

-->CapabilityEngine

-->Dashboard
```

---

# 13. Event Flow

系统采用事件驱动。

主要事件包括：

KnowledgeUploaded

KnowledgeParsed

PlayableGenerated

PlayablePublished

PlayableStarted

PlayableCompleted

BehaviorCollected

CapabilityUpdated

RecommendationGenerated

---

# 14. Module Dependency

依赖关系如下：

```text
Application

↓

AI Engine

↓

Playable Runtime

↓

Capability Engine

↓

Data Platform

↓

Infrastructure
```

上层可调用下层。

下层不得依赖上层。

---

# 15. Interface Principles

模块之间不得直接访问数据库。

统一通过：

Service

↓

API

↓

Event

进行通信。

禁止：

Module A

↓

直接操作

↓

Module B Database

---

# 16. Scalability

所有 Engine 必须支持：

独立升级。

独立部署。

独立测试。

独立扩展。

未来：

可拆分为独立微服务。

---

# 17. Observability

所有核心模块必须输出：

Log

Metric

Trace

Event

支持：

问题定位。

行为分析。

性能优化。

---

# 18. Security

系统必须支持：

身份认证。

权限控制。

数据隔离。

企业隔离。

Prompt 安全。

模型安全。

审计日志。

---

# 19. Extension

未来支持：

插件。

第三方 Agent。

第三方 Model。

第三方 Runtime。

第三方 Knowledge Source。

开放 API。

---

# 20. Architecture Principles

整个系统遵循：

- AI Native
- Engine First
- Event Driven
- Service Oriented
- Low Coupling
- High Cohesion
- Structured Data
- API First

---

# 21. Relationship With Other Documents

本架构负责定义：

系统组成。

后续文档负责具体实现。

对应关系：

```text
31_PGE_Specification.md
↓

AI Engine

32_KPG_Specification.md
↓

Knowledge Analyzer

33_Agent_Architecture.md
↓

AI Agent

41_PRD.md
↓

Application

API

↓

Interface

Database

↓

Storage
```

---

# 22. One Sentence

> PlayableOS 是一组 Engine 的协同系统。

> 每一个 Engine 负责一个明确职责。

> 所有 Engine 共同完成：

Knowledge → Playable → Capability。
