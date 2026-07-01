---
title: Runtime Architecture
id: ARC-004
version: 1.0.0
status: Draft
owner: PlayableOS
updated: 2026-07-02
category: Architecture
---

# Runtime Architecture

> Runtime 是 PlayableOS 的体验运行引擎。

它负责执行 Playable Blueprint，并采集用户行为数据。

---

# 1. Responsibility

Runtime 负责：

- 加载 Playable Blueprint
- 创建训练环境
- 驱动 AI Agent
- 管理交互流程
- 采集 Behavior Event
- 输出训练结果

Runtime 不负责：

- 理解知识（KPG）
- 设计体验（PGE）
- 能力计算（Capability Engine）

---

# 2. Runtime Position

```text
Knowledge Object

↓

PGE

↓

Playable Blueprint

↓

Runtime

↓

Behavior Event
```

Runtime 是：

Blueprint 的执行者。

---

# 3. Runtime Components

```text
Runtime

├── Blueprint Loader
├── Scene Manager
├── Interaction Engine
├── Agent Manager
├── Event Bus
├── State Manager
└── Result Collector
```

---

# 4. Core Modules

## Blueprint Loader

加载 Playable Blueprint。

初始化训练。

---

## Scene Manager

创建训练场景。

管理角色。

管理流程。

---

## Interaction Engine

负责：

- Dialogue
- Choice
- Workflow
- Simulation
- Boss Battle

所有交互统一由 Interaction Engine 执行。

---

## Agent Manager

管理所有 AI Agent。

例如：

- Customer Agent
- Manager Agent
- Coach Agent
- Judge Agent

---

## Event Bus

所有行为统一产生 Event。

例如：

```text
User Selected Option

↓

Behavior Event

↓

Capability Engine
```

---

## State Manager

维护当前训练状态。

包括：

- Progress
- Variables
- Inventory
- Branches

---

## Result Collector

收集训练结果。

输出：

- Behavior Event
- Runtime Log
- Session Summary

---

# 5. Design Principles

Runtime 遵循：

- Blueprint Driven
- Event Driven
- Stateless Design
- Modular
- Extensible

---

# Summary

Runtime 不负责思考。

Runtime 负责执行。

AI 负责设计。

Runtime 负责让设计真正发生。
