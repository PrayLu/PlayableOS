---
title: Event Model
id: ARC-005
version: 1.0.0
status: Draft
owner: PlayableOS
updated: 2026-07-02
category: Architecture
---

# Event Model

> Event 是 PlayableOS 中所有模块之间通信的统一机制。

---

# 1. Why Event?

PlayableOS 采用 Event-Driven Architecture。

各模块之间不直接调用，而是通过 Event 协作。

```text
Runtime

↓

Behavior Event

↓

Event Bus

↓

Capability Engine
Assessment Engine
Analytics
Dashboard
```

---

# 2. Core Events

V1 定义以下核心事件。

| Event | Description |
|--------|-------------|
| SessionStarted | 开始训练 |
| SessionFinished | 完成训练 |
| ChoiceSelected | 用户选择 |
| DialogueSubmitted | AI 对话 |
| TaskCompleted | 完成任务 |
| ChallengeSucceeded | 挑战成功 |
| ChallengeFailed | 挑战失败 |
| FeedbackGenerated | 生成反馈 |
| CapabilityUpdated | 能力更新 |

---

# 3. Event Structure

每一个 Event 包含：

```text
Event

├── Event ID
├── Event Type
├── Timestamp
├── User ID
├── Session ID
├── Source
└── Payload
```

---

# 4. Event Lifecycle

```text
Create

↓

Publish

↓

Subscribe

↓

Process

↓

Archive
```

Event 不允许修改。

只能新增。

---

# 5. Design Principles

- Event Driven
- Immutable
- Traceable
- Replayable
- Low Coupling

---

# Summary

Behavior Event 是 PlayableOS 的统一通信语言。

所有能力成长都由 Event 驱动。
