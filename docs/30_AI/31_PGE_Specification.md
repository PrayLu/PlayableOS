---
title: Playable Generation Engine Specification
id: AI-002
version: 1.0.0
status: Draft
owner: PlayableOS
updated: 2026-07-01
category: AI
---

# Playable Generation Engine Specification

> Playable 生成引擎规范（Playable Generation Engine，PGE）

> PGE 是 PlayableOS 的核心 AI 系统，负责将企业知识自动转换为可训练、可体验、可评估的 Playable。

---

# Chapter 1. Definition

## 1.1 为什么需要 PGE？

企业拥有越来越多的知识。

例如：

- PPT
- PDF
- SOP
- 企业文化
- 管理制度
- 销售案例
- 培训课程
- 视频
- 操作规范

但是。

这些知识天然适合阅读。

并不天然适合形成能力。

因此。

企业一直依赖：

- 培训老师
- 课程设计师
- 游戏设计师
- 教练

共同把知识设计成学习体验。

这个过程：

成本高。

周期长。

无法规模化。

PGE 的出现，就是为了自动完成这一过程。

---

## 1.2 PGE 的定义

Playable Generation Engine（PGE）

是 PlayableOS 的核心 AI 引擎。

它负责：

> **将企业知识自动设计为能力成长体验（Playable）。**

注意。

PGE 并不是：

小游戏生成器。

也不是：

内容生成器。

而是：

**能力体验设计引擎。**

---

## 1.3 PGE 的使命

PGE 的使命只有一句话：

> **让每一份知识，都可以玩转起来。**

换句话说：

Knowledge

↓

Playable

↓

Capability

这一过程。

全部由 PGE 完成。

---

## 1.4 PGE 不是什么

为了避免误解。

首先定义：

PGE 不负责什么。

PGE 不是：

- ChatBot
- AI 助手
- PPT 生成器
- 课程生成器
- 游戏生成器
- LMS

PGE 的目标不是：

生成内容。

而是：

设计训练。

---

## 1.5 PGE 的真正价值

传统 AI 更关注：

Generate（生成）。

PGE 更关注：

Design（设计）。

例如：

上传一份：

《销售技巧培训》

传统 AI：

生成：

总结。

考试。

PPT。

PGE：

生成：

客户模拟。

销售对话。

成交挑战。

Boss Battle。

复盘反馈。

成长路径。

因此：

PGE 真正生成的不是内容。

而是：

能力成长体验。

---

## 1.6 PGE 的工作对象

PGE 的输入不是课程。

PGE 的输入是：

Knowledge。

Knowledge 可以来自：

- PPT
- PDF
- Markdown
- 视频
- 企业知识库
- CRM
- SOP
- 企业文化

PGE 的输出不是课程。

而是：

Playable Package。

---

## 1.7 PGE 的输入

统一输入对象：

Knowledge Package

包括：

- 内容
- 类型
- 标签
- 来源
- 岗位
- 企业信息

详细结构。

见：

Data Architecture。

---

## 1.8 PGE 的输出

统一输出对象：

Playable Package

包括：

- Metadata
- Capability
- Scenario
- Mechanic
- Interaction
- Assessment
- Runtime Configuration

Playable Package 是整个系统唯一训练对象。

---

## 1.9 PGE 在整个系统中的位置

```
Knowledge

↓

PGE

↓

Playable

↓

Behavior

↓

Capability
```

其中：

Knowledge

来自：

Knowledge Layer

Playable

运行于：

Playable Runtime

Capability

由：

Capability Engine

持续更新。

---

## 1.10 PGE 的四项职责

PGE 不负责：

学习。

PGE 负责：

四件事情。

### 第一：

理解知识。

Knowledge Understanding

理解：

企业真正想表达什么。

---

### 第二：

理解能力。

Capability Reasoning

理解：

员工真正需要形成什么能力。

---

### 第三：

设计体验。

Experience Design

设计：

最适合形成能力的训练体验。

---

### 第四：

输出训练。

Playable Generation

输出：

Playable Package。

供 Runtime 直接运行。

---

## 1.11 PGE 的边界

PGE 不负责：

- 用户管理
- 权限管理
- 企业管理
- Dashboard
- 数据分析
- Playable 运行
- AI 对话执行

PGE 只负责：

Knowledge

↓

Playable Package

整个设计过程。

---

## 1.12 PGE 的一句话定义

> **PGE 并不是生成知识。**

> **PGE 也不是生成游戏。**

> **PGE 的真正使命，是设计能力成长体验。**

---

# Chapter Summary

PGE 回答的问题不是：

> 如何生成？

而是：

> 如何帮助员工形成能力？

因此。

PGE 是：

**PlayableOS 的 Experience Design Engine。**

而不是：

Content Generation Engine。

---

# Chapter 2. Decision Framework

> PGE 的核心能力不是生成（Generation），而是决策（Decision）。

> PGE 的价值，不在于生成一个小游戏，而在于设计一条正确的能力成长路径。

---

# 2.1 为什么需要 Decision Framework？

传统 AI 的工作方式是：

```
Prompt

↓

Generate
```

也就是说：

输入一段文字。

输出一段内容。

而 PGE 并不是这样工作。

PGE 面对的是企业知识。

企业知识并不存在唯一答案。

例如：

同样是一份 PPT。

不同企业。

不同岗位。

不同员工。

最终生成的 Playable 应该完全不同。

因此。

PGE 首先需要推理。

然后才生成。

---

# 2.2 PGE 是一个 Decision Engine

PGE 不只是生成器。

PGE 是一系列连续决策组成的 AI 系统。

整个过程可以理解为：

```
Knowledge

↓

Understand

↓

Reason

↓

Design

↓

Generate
```

Generate 只是最后一步。

真正决定 Playable 质量的是：

Reason（推理）。

---

# 2.3 Decision Pipeline

PGE 采用统一决策流水线。

```text
Knowledge

↓

Knowledge Understanding

↓

Business Goal Understanding

↓

Capability Mapping

↓

Scenario Selection

↓

Mechanic Selection

↓

Experience Composition

↓

Playable Package
```

每一步都回答一个不同的问题。

---

# 2.4 Step 1：Knowledge Understanding

第一步。

理解知识。

PGE 首先识别：

这份知识到底是什么。

例如：

- 企业文化
- SOP
- 销售流程
- 产品知识
- 管理制度
- 法规
- 案例
- 操作规范

不同类型知识。

后续决策完全不同。

因此。

Knowledge Understanding 是整个 Pipeline 的入口。

---

# 2.5 Step 2：Business Goal Understanding

企业上传知识。

并不是为了知识本身。

而是为了实现某个业务目标。

例如：

企业文化培训。

真正目标：

文化落地。

销售培训。

真正目标：

提升销售表现。

安全培训。

真正目标：

降低风险。

因此。

PGE 第二步不是训练。

而是理解：

企业真正希望发生什么改变。

注意。

Business Goal 并不是 PGE 的输出。

而是 PGE 的设计依据。

---

# 2.6 Step 3：Capability Mapping

Business Goal 无法直接训练。

PGE 必须把业务目标转换成能力目标。

例如：

企业目标：

提升客户满意度。

↓

能力目标：

主动倾听。

情绪回应。

问题分析。

沟通表达。

企业目标：

提高执行力。

↓

能力目标：

任务拆解。

优先级判断。

时间管理。

责任意识。

Capability Mapping 是整个系统最关键的一步。

因为：

PGE 真正能够交付的是能力成长。

而不是业务结果。

---

# 2.7 Step 4：Scenario Selection

能力只能在场景中形成。

因此。

PGE 根据目标能力。

自动选择训练场景。

例如：

销售能力。

↓

客户拜访。

异议处理。

商务谈判。

管理能力。

↓

绩效面谈。

目标制定。

团队冲突。

不同场景。

决定不同体验。

---

# 2.8 Step 5：Mechanic Selection

同一种能力。

可以采用不同训练方式。

例如：

沟通能力。

可以采用：

AI 对话。

角色扮演。

多人协作。

领导力。

可以采用：

经营模拟。

团队管理。

剧情挑战。

Mechanic 的选择依据不是趣味。

而是：

哪一种训练方式。

最容易形成目标能力。

---

# 2.9 Step 6：Experience Composition

当：

能力。

场景。

Mechanic。

全部确定以后。

PGE 开始设计完整体验。

体验包括：

- 剧情
- AI角色
- 对话
- 决策点
- 分支剧情
- 即时反馈
- 复盘
- 能力评估

这里。

PGE 真正扮演的是：

Experience Designer。

而不是：

Game Generator。

---

# 2.10 Step 7：Playable Package

最后。

PGE 输出统一对象：

Playable Package。

Playable Runtime 不关心知识。

也不关心能力。

Runtime 只负责运行：

Playable Package。

实现：

训练体验。

---

# 2.11 Decision Principles

PGE 所有决策遵循以下原则：

第一：

业务目标决定能力方向。

第二：

能力决定训练目标。

第三：

场景决定真实体验。

第四：

Mechanic 决定交互方式。

第五：

体验决定行为。

第六：

行为决定能力成长。

整个 Decision Framework 始终围绕：

> 能力成长。

而不是内容生成。

---

# Chapter Summary

PGE 不直接生成 Playable。

PGE 首先完成：

企业语言

↓

能力语言

↓

体验语言

三次转换。

随后。

才生成：

Playable Package。

因此。

PGE 的核心竞争力不是生成能力。

而是：

Decision Intelligence（决策智能）。

---

# Chapter 3. Knowledge Understanding

> Knowledge Understanding 是 PGE 的第一项核心能力。

> PGE 并不读取知识，而是理解知识。

---

# 3.1 为什么需要 Knowledge Understanding？

企业上传给 PGE 的知识形式千差万别。

例如：

- PPT
- PDF
- Word
- 视频
- SOP
- Excel
- 企业制度
- CRM 记录
- 客户案例
- 企业文化

这些只是不同的载体（Carrier）。

PGE 不关心载体。

PGE 真正关心的是：

> **知识本身。**

因此。

Knowledge Understanding 的目标不是解析文件。

而是建立知识模型。

---

# 3.2 Carrier ≠ Knowledge

同一份知识。

可以存在不同载体。

例如：

《销售流程》

可能存在：

PPT

↓

Word

↓

视频

↓

思维导图

↓

企业 Wiki

知识没有变化。

变化的是：

表达方式。

因此。

PGE 第一原则：

> **永远理解 Knowledge，而不是理解 File。**

---

# 3.3 Knowledge Package

经过解析以后。

所有知识统一转换为：

Knowledge Package。

Knowledge Package 是 PGE 唯一输入对象。

例如：

```text
Knowledge Package

├── Metadata
├── Knowledge Type
├── Knowledge Structure
├── Knowledge Units
├── Capability Tags
├── Context
└── Assets
```

之后所有 Engine。

全部围绕 Knowledge Package 工作。

---

# 3.4 Knowledge Type Recognition（知识类型识别）

PGE 首先识别：

知识属于哪一种类型。

V1 定义八类知识。

## Type 1

Concept（概念）

例如：

企业使命。

AI 定义。

产品定位。

特点：

理解即可。

---

## Type 2

Process（流程）

例如：

销售 SOP。

审批流程。

生产流程。

特点：

强调顺序。

---

## Type 3

Rule（规则）

例如：

安全制度。

法律法规。

质量标准。

特点：

强调约束。

---

## Type 4

Skill（技能）

例如：

销售技巧。

沟通技巧。

演讲技巧。

特点：

强调训练。

---

## Type 5

Case（案例）

例如：

客户案例。

项目复盘。

成功经验。

特点：

强调分析。

---

## Type 6

Scenario（情境）

例如：

客户投诉。

设备故障。

团队冲突。

特点：

强调决策。

---

## Type 7

Value（价值观）

例如：

企业文化。

行为准则。

服务理念。

特点：

强调认同。

---

## Type 8

Strategy（战略）

例如：

经营战略。

组织战略。

产品战略。

特点：

强调判断。

---

# 3.5 Knowledge Structure Recognition

识别知识结构。

例如：

树状。

流程。

时间轴。

对比。

矩阵。

Checklist。

不同结构。

决定后续 Playable 的表达方式。

例如：

流程。

更适合：

Workflow。

矩阵。

更适合：

Decision Challenge。

---

# 3.6 Knowledge Unit Extraction

Knowledge 不应整体训练。

必须拆分。

因此。

PGE 自动切分：

Knowledge Unit。

例如：

一份：

销售 PPT。

拆分为：

Knowledge Unit 1

建立信任。

Knowledge Unit 2

需求分析。

Knowledge Unit 3

产品介绍。

Knowledge Unit 4

异议处理。

Knowledge Unit 5

成交。

Knowledge Unit 是后续推理最小输入单位。

---

# 3.7 Explicit Knowledge & Implicit Knowledge

企业知识分为两类。

## 显性知识（Explicit Knowledge）

文档中已经写出来。

例如：

制度。

流程。

SOP。

---

## 隐性知识（Implicit Knowledge）

文档没有写。

但专家默认知道。

例如：

为什么客户会拒绝？

什么时候应该沉默？

什么时候继续追问？

真正优秀的培训。

往往训练的是：

隐性知识。

因此。

PGE 必须尝试识别：

Implicit Knowledge。

---

# 3.8 Knowledge Density

不是所有知识。

都需要同样训练。

因此。

PGE 计算：

Knowledge Density（知识密度）。

例如：

一页 PPT：

只有一句口号。

密度低。

一页：

销售流程。

密度高。

高密度知识。

优先拆分。

低密度知识。

更多作为背景。

---

# 3.9 Knowledge Relationship Graph

知识之间存在关系。

例如：

企业文化。

影响：

销售行为。

销售流程。

依赖：

产品知识。

产品知识。

依赖：

行业知识。

因此。

PGE 自动建立：

Knowledge Graph。

而不是孤立理解每一页 PPT。

---

# 3.10 Knowledge Understanding Output

Knowledge Understanding 最终输出：

Knowledge Model。

包括：

- Knowledge Type
- Knowledge Units
- Structure
- Context
- Implicit Knowledge
- Related Knowledge
- Suggested Capability

Knowledge Model 将交给：

Decision Framework。

继续推理。

---

# 3.11 Design Principles

Knowledge Understanding 遵循：

第一：

理解知识。

不是理解文件。

第二：

理解结构。

不是理解页面。

第三：

理解关系。

不是理解章节。

第四：

理解目标。

不是理解文字。

第五：

理解隐性知识。

不是只理解显性知识。

---

# Chapter Summary

Knowledge Understanding 并不是一个 Parser。

而是：

Knowledge Intelligence。

它建立了：

企业知识的数字化理解模型。

这是 PGE 后续所有推理工作的基础。

---

# Chapter 4. Capability Mapping

> Capability Mapping 是 PGE 最重要的推理过程之一。

> 它负责将企业知识转化为可训练、可评估的能力目标。

---

# 4.1 为什么需要 Capability Mapping？

Knowledge 不能直接训练。

例如：

企业文化。

制度。

SOP。

案例。

这些都是知识。

员工真正需要获得的是：

能力。

因此。

PGE 必须完成：

Knowledge

↓

Capability

这一过程。

---

# 4.2 Capability Mapping 的目标

Capability Mapping 回答：

> 这份知识，最终希望员工能够做到什么？

注意。

不是：

学会什么。

而是：

做到什么。

---

# 4.3 Step 1：Training Objective Recognition

首先。

PGE 判断：

这份知识。

真正训练目标是什么。

Training Objective 包括：

## Know

知道。

例如：

产品知识。

法规。

制度。

---

## Do

做到。

例如：

SOP。

流程。

规范。

---

## Think

形成判断。

例如：

管理案例。

经营案例。

战略案例。

---

## Believe

形成认同。

例如：

企业文化。

价值观。

服务理念。

---

## Perform

形成稳定能力。

例如：

销售。

管理。

沟通。

领导力。

Training Objective 决定后续所有推理。

---

# 4.4 Step 2：Capability Recognition

PGE 根据：

Training Objective。

自动识别：

目标能力。

例如：

销售培训。

↓

销售能力。

管理培训。

↓

管理能力。

企业文化。

↓

价值观实践能力。

安全培训。

↓

风险识别能力。

---

# 4.5 Step 3：Capability Decomposition

能力不能直接训练。

因此。

PGE 自动拆分能力。

例如：

销售能力。

↓

建立信任。

↓

需求分析。

↓

产品表达。

↓

异议处理。

↓

成交推进。

拆分结果来自：

ECM。

Capability DNA。

---

# 4.6 Step 4：Capability Prioritization

不是所有能力。

都需要同样训练。

PGE 自动判断：

哪些能力。

最值得训练。

例如：

销售 SOP。

可能：

异议处理。

权重最高。

产品介绍。

权重最低。

因此。

训练资源。

优先投入：

关键能力。

---

# 4.7 Step 5：Capability Dependency

能力之间存在依赖关系。

例如：

不会倾听。

无法需求分析。

不会需求分析。

无法产品表达。

因此。

PGE 自动建立：

Capability Dependency Graph。

保证：

训练顺序正确。

---

# 4.8 Step 6：Capability Output

Capability Mapping 最终输出：

Capability Model。

包括：

Capability

↓

Capability Cluster

↓

Capability Gene

↓

Priority

↓

Dependency

供：

Scenario Engine。

继续推理。

---

# 4.9 Capability Hint Reasoning

PGE 根据 Knowledge Intelligence。

自动推理：

Capability Hint。

例如：

投诉案例。

↓

沟通。

↓

情绪管理。

↓

问题分析。

↓

服务意识。

Capability Hint。

是 PGE 对目标能力的初步判断。

Capability Mapping 将在此基础上。

完成正式的能力识别与拆解。

---

# 4.10 Design Principles

Capability Mapping 遵循：

第一：

训练能力。

不是训练知识。

第二：

训练行为。

不是训练概念。

第三：

训练关键能力。

不是平均训练。

第四：

训练成长路径。

不是单一技能。

第五：

能力必须可观察。

可评估。

可持续成长。

---

# Chapter Summary

Capability Mapping 建立了：

Knowledge

↓

Capability

之间的桥梁。

它回答：

员工最终应该成为什么样的人。

而不是：

员工应该学习什么。

---

# Chapter 5. Scenario Construction

> Scenario Construction 是 PGE 将能力映射到真实工作世界的过程。

> PGE 并不是选择一个场景，而是构建一个能够促进能力成长的训练环境。

---

# 5.1 为什么需要 Scenario？

能力不能脱离场景形成。

例如：

沟通能力。

如果没有沟通对象。

就无法训练。

领导力。

如果没有团队。

就无法训练。

销售能力。

如果没有客户。

就无法训练。

因此。

任何能力。

都必须放入：

真实或接近真实的工作世界。

---

# 5.2 Scenario 的定义

PlayableOS 中。

Scenario 定义为：

> **一个能够承载训练目标、角色关系、事件发展和决策行为的完整体验环境。**

Scenario 不只是：

地点。

而是：

完整工作情境。

---

# 5.3 Scenario 的组成

每一个 Scenario 包括：

```text
Scenario

├── Context（背景）

├── Characters（角色）

├── Objective（目标）

├── Conflict（冲突）

├── Constraints（限制）

├── Events（事件）

└── Success Criteria（成功标准）
```

只有完整 Scenario。

才能形成真实训练。

---

# 5.4 Context（背景）

Context 定义：

事情发生在哪里。

例如：

医院。

办公室。

客户公司。

工厂。

会议室。

不同 Context。

决定体验真实性。

---

# 5.5 Characters（角色）

Scenario 至少包含一个角色。

通常包括：

员工。

客户。

主管。

同事。

合作伙伴。

AI 可以自动生成角色。

包括：

身份。

职位。

经验。

性格。

沟通风格。

行为特点。

不同角色。

形成不同体验。

---

# 5.6 Objective（目标）

Scenario 必须拥有明确目标。

例如：

完成销售。

解决投诉。

组织会议。

完成交接。

安全检查。

目标越明确。

训练越有效。

---

# 5.7 Conflict（冲突）

没有冲突。

就没有训练。

例如：

客户拒绝。

员工抵触。

时间不足。

预算不足。

信息缺失。

冲突。

迫使员工：

做决策。

因此。

Conflict 是训练的核心驱动力。

---

# 5.8 Constraints（限制）

真实工作。

永远存在限制。

例如：

时间限制。

预算限制。

权限限制。

资源限制。

制度限制。

Scenario 应尽可能保留真实限制。

否则。

体验容易失真。

---

# 5.9 Events（事件）

Scenario 由多个事件组成。

例如：

客户进入。

↓

提出需求。

↓

提出异议。

↓

竞争对手出现。

↓

领导加入会议。

↓

最终成交。

Events 构成完整剧情。

---

# 5.10 Success Criteria（成功标准）

训练必须有成功标准。

例如：

客户满意。

流程完成。

风险解除。

团队接受。

销售成交。

成功标准。

决定：

后续反馈。

能力评估。

成长建议。

---

# 5.11 Scenario Construction Pipeline

PGE 构建 Scenario：

```text
Capability

↓

Context

↓

Characters

↓

Objective

↓

Conflict

↓

Constraints

↓

Events

↓

Scenario
```

最终形成：

Scenario Model。

---

# 5.12 Scenario Library

PGE 不依赖固定模板。

而是维护：

Scenario Library。

例如：

销售。

管理。

客服。

研发。

生产。

安全。

企业文化。

每个领域。

拥有大量：

Scenario Pattern。

AI 自动组合。

生成新的训练世界。

---

# 5.13 Scenario Potential Reasoning

PGE 判断：

哪些 Knowledge Unit。

适合构建 Scenario。

例如：

产品参数。

Scenario Potential：

低。

客户投诉。

Scenario Potential：

高。

领导反馈。

Scenario Potential：

极高。

Scenario Potential。

帮助 PGE。

选择：

Scenario。

---

# 5.14 Design Principles

Scenario Construction 遵循：

第一：

真实优先。

第二：

能力驱动。

第三：

冲突驱动。

第四：

决策驱动。

第五：

反馈驱动。

Scenario 的目的。

不是讲故事。

而是创造能力成长环境。

---

# Chapter Summary

Scenario 是连接：

能力。

与：

体验。

之间的重要桥梁。

PGE 真正设计的。

不是一个故事。

而是一段能够促进能力成长的真实经历。

---

# Chapter 6. Mechanic Selection

> Mechanic Selection 是 PGE 将能力训练转化为可交互体验的过程。

> Mechanic 不是游戏元素，而是训练行为的交互载体。

---

# 6.1 为什么需要 Mechanic？

能力不会因为观看而形成。

能力必须通过行为形成。

因此。

Scenario 确定以后。

PGE 需要继续回答：

> 员工应该如何参与？

Mechanic 就是这个问题的答案。

---

# 6.2 Mechanic 的定义

PlayableOS 中。

Mechanic 定义为：

> **驱动员工产生目标行为的交互机制。**

Mechanic 不负责娱乐。

Mechanic 的职责只有一个：

**促使目标行为发生。**

---

# 6.3 Experience → Interaction → Mechanic

Mechanic 并不是设计起点。

真正设计顺序如下：

```text
Capability

↓

Experience

↓

Interaction

↓

Mechanic
```

说明：

Capability

决定训练目标。

↓

Experience

决定员工应该经历什么。

↓

Interaction

决定员工如何参与。

↓

Mechanic

决定采用什么交互形式。

因此。

Mechanic 永远服务于 Experience。

---

# 6.4 Mechanic Selection Pipeline

PGE 采用如下决策流程：

```text
Capability

↓

Expected Behavior

↓

Interaction Pattern

↓

Mechanic

↓

Playable
```

其中：

Expected Behavior

来自 Capability Mapping。

Interaction Pattern

来自 Experience Design。

---

# 6.5 Mechanic 分类

PlayableOS V1 定义以下 Mechanic。

## Dialogue

AI 对话。

适用于：

销售。

客服。

管理。

领导力。

---

## Choice

情景选择。

适用于：

价值观。

制度。

案例分析。

风险判断。

---

## Workflow

流程执行。

适用于：

SOP。

操作规范。

审批流程。

---

## Puzzle

问题拆解。

适用于：

知识理解。

系统分析。

逻辑训练。

---

## Simulation

模拟经营。

适用于：

管理。

经营。

资源分配。

---

## Role Play

角色扮演。

适用于：

沟通。

谈判。

绩效反馈。

招聘。

---

## Boss Battle

关键挑战。

适用于：

综合能力评估。

高压决策。

复杂问题解决。

---

## Collaboration

多人协作。

适用于：

团队协作。

项目管理。

跨部门合作。

---

# 6.6 Mechanic Selection Rules

PGE 不根据趣味性选择 Mechanic。

而根据：

能力特点。

例如：

沟通能力。

优先：

Dialogue。

流程能力。

优先：

Workflow。

价值观。

优先：

Choice。

管理能力。

优先：

Simulation。

综合能力。

优先：

Boss Battle。

Mechanic 永远服从能力。

---

# 6.7 Mechanic Combination

真实训练。

通常需要多个 Mechanic。

例如：

销售训练：

```text
Dialogue

↓

Choice

↓

Role Play

↓

Boss Battle
```

Mechanic 可以自由组合。

形成完整体验。

---

# 6.8 Difficulty Control

Mechanic 支持动态难度。

包括：

Beginner

Intermediate

Advanced

Expert

AI 根据员工能力。

动态调整训练复杂度。

---

# 6.9 Feedback Integration

Mechanic 不只是交互。

每一个 Mechanic。

必须输出：

Behavior Event。

包括：

选择。

失败。

成功。

放弃。

重试。

这些数据。

最终进入：

Capability Engine。

---

# 6.10 Interaction Potential Reasoning

PGE 判断：

哪些 Interaction。

更适合当前训练目标。

例如：

流程。

↓

Workflow。

案例。

↓

Choice。

沟通。

↓

Dialogue。

经营。

↓

Simulation。

Interaction Potential。

是 Mechanic Selection 的推理依据。

最终 Mechanic 选择。

仍由能力特点决定。

---

# 6.11 Design Principles

Mechanic Selection 遵循：

第一：

能力优先。

第二：

行为优先。

第三：

体验优先。

第四：

真实优先。

第五：

反馈优先。

Mechanic 的目标。

不是增加趣味。

而是提高能力形成效率。

---

# Chapter Summary

Mechanic 是能力训练的交互语言。

不同 Mechanic。

并不代表不同游戏。

而代表不同训练方式。

PGE 选择 Mechanic。

本质是在选择：

员工如何成长。

---

# Chapter 7. Experience Composition

> Experience Composition 是 PGE 将能力、场景、交互机制组织成完整成长体验的过程。

> PGE 并不是组合游戏元素，而是在设计一次能力成长旅程。

---

# 7.1 为什么需要 Experience Composition？

前面的章节已经回答了：

Knowledge

↓

Capability

↓

Scenario

↓

Mechanic

但是。

这些仍然只是素材。

真正的 Playable。

不是素材集合。

而是一段完整体验。

Experience Composition 的任务就是：

> **把所有元素组织成一段自然、连续、有成长感的体验。**

---

# 7.2 Experience 的定义

PlayableOS 中。

Experience 定义为：

> **员工为了形成某项能力而经历的一系列连续事件。**

Experience 不是页面。

不是关卡。

不是小游戏。

Experience 是：

一段成长过程。

---

# 7.3 Experience Architecture

PGE 在设计 Experience 时。

遵循统一结构。

```text
Introduction

↓

Challenge

↓

Decision

↓

Feedback

↓

Reflection

↓

Next Challenge
```

这不是固定流程。

而是成长循环。

员工不断经历：

挑战。

决策。

反馈。

反思。

能力逐渐形成。

---

# 7.4 Introduction（进入）

体验开始时。

AI 需要建立：

Context。

包括：

为什么发生？

背景是什么？

我的角色是谁？

目标是什么？

员工需要快速进入情境。

---

# 7.5 Challenge（挑战）

没有挑战。

没有成长。

Challenge 可以来自：

客户。

主管。

团队。

市场。

系统。

时间。

资源。

AI 自动设计：

与目标能力相匹配的挑战。

---

# 7.6 Decision（决策）

Challenge 出现以后。

员工必须行动。

Decision 可以包括：

选择。

沟通。

判断。

排序。

操作。

设计。

这是 Behavior 真正发生的地方。

---

# 7.7 Feedback（反馈）

Decision 必须立即得到反馈。

反馈包括：

结果反馈。

原因反馈。

建议反馈。

反馈目标不是评分。

而是促进下一次更好的行为。

---

# 7.8 Reflection（反思）

Reflection 是传统培训最容易忽略的一步。

PGE 自动引导员工思考：

为什么成功？

为什么失败？

如果重新来一次。

会如何选择？

Reflection 帮助行为逐渐内化。

---

# 7.9 Progressive Challenge（渐进挑战）

能力成长不是重复同一道题。

而是：

不断升级挑战。

例如：

销售训练。

Level 1：

普通客户。

↓

Level 2：

犹豫客户。

↓

Level 3：

强势客户。

↓

Level 4：

复杂采购团队。

↓

Level 5：

战略客户。

AI 自动提升复杂度。

保持成长节奏。

---

# 7.10 Adaptive Experience

不同员工。

体验不同。

AI 根据：

能力等级。

历史表现。

错误类型。

自动调整：

挑战。

反馈。

剧情。

角色。

训练重点。

Experience 永远动态生成。

不是固定脚本。

---

# 7.11 Experience Flow

完整 Experience 如下：

```text
Knowledge

↓

Capability

↓

Scenario

↓

Challenge

↓

Decision

↓

Feedback

↓

Reflection

↓

Capability Growth
```

每完成一次循环。

能力都会发生变化。

---

# 7.12 Experience Principles

Experience Composition 遵循：

第一：

成长优先。

第二：

真实性优先。

第三：

决策优先。

第四：

反馈优先。

第五：

持续成长优先。

体验不是为了娱乐。

而是为了形成能力。

---

# 7.13 Assessment Potential Reasoning

PGE 判断：

不同知识。

应采用何种评估方式。

例如：

法规。

更适合：

Knowledge Check。

销售。

更适合：

Dialogue。

管理。

更适合：

Simulation。

Assessment Potential。

帮助 PGE。

设计 Assessment Blueprint。

Assessment 与 Experience 同步运行。

不是结束后统一评分。

---

# 7.14 Output

Experience Composition 最终输出：

Experience Blueprint。

Blueprint 包括：

- Experience Structure
- Scenario
- Interaction Flow
- Mechanic Sequence
- Feedback Strategy
- Assessment Strategy

Experience Blueprint 是 Runtime 的直接输入。

---

# Chapter Summary

Experience Composition 是 PGE 的最后一个设计阶段。

它把：

能力。

场景。

交互。

反馈。

组织成一次完整体验。

PGE 最终设计的。

不是小游戏。

而是：

一段能力成长旅程。

---

# Chapter 8. Playable Package

> Playable Package 是 PGE 唯一输出对象。

> 它不是最终游戏，而是一份可执行的体验蓝图（Experience Blueprint）。

---

# 8.1 为什么需要 Playable Package？

PGE 的职责不是运行体验。

PGE 的职责是设计体验。

因此。

PGE 输出的不是：

HTML。

小游戏。

AI 对话。

页面。

而是一份：

Experience Blueprint。

Runtime 根据 Blueprint。

动态运行体验。

---

# 8.2 Playable Package 的定义

Playable Package 定义为：

> **描述一次能力成长体验所需全部信息的标准数据对象。**

Playable Package 是：

PGE

↓

Runtime

之间唯一通信对象。

任何 Runtime。

都应该能够解析：

Playable Package。

---

# 8.3 Package Structure

Playable Package 包括：

```text
Playable Package

├── Metadata
├── Capability Blueprint
├── Scenario Blueprint
├── Experience Blueprint
├── Interaction Blueprint
├── Assessment Blueprint
├── Runtime Configuration
└── Assets
```

每一个 Blueprint。

描述不同层级的信息。

---

# 8.4 Metadata

Metadata 描述基础信息。

例如：

- ID
- Version
- Title
- Language
- Difficulty
- Duration
- Author（AI）
- Enterprise

Metadata 不参与训练。

用于管理。

---

# 8.5 Capability Blueprint

Capability Blueprint 定义：

本次训练目标。

包括：

- Target Capability
- Capability Gene
- Priority
- Learning Objective

Runtime 根据 Capability Blueprint。

决定：

反馈方式。

成长建议。

---

# 8.6 Scenario Blueprint

Scenario Blueprint 包括：

- Context
- Characters
- Events
- Conflict
- Constraints
- Success Criteria

Runtime 根据 Scenario Blueprint。

动态创建训练环境。

---

# 8.7 Experience Blueprint

Experience Blueprint 定义：

整个体验流程。

例如：

Introduction

↓

Challenge

↓

Decision

↓

Feedback

↓

Reflection

↓

Next Challenge

Experience Blueprint。

是 Runtime 最核心的数据结构。

---

# 8.8 Interaction Blueprint

Interaction Blueprint 描述：

所有交互。

例如：

Dialogue。

Choice。

Workflow。

Boss Battle。

Role Play。

每一种 Interaction。

都具有：

输入。

输出。

事件。

反馈。

Runtime 按 Blueprint。

执行。

---

# 8.9 Assessment Blueprint

Assessment Blueprint 包括：

Behavior Event。

Capability Evaluation。

Feedback Strategy。

Growth Suggestion。

Assessment 与 Experience 同步运行。

不是结束后统一评分。

---

# 8.10 Runtime Configuration

Runtime Configuration 描述：

运行方式。

例如：

单人。

多人。

AI Agent 数量。

联网。

时间限制。

难度。

奖励。

等等。

Runtime 不需要理解知识。

只需要理解：

Configuration。

---

# 8.11 Assets

Assets 包括：

图片。

视频。

音频。

角色。

企业 Logo。

文档。

Prompt。

以及：

AI 动态生成内容。

Assets 不直接参与逻辑。

作为资源引用。

---

# 8.12 Package Lifecycle

Playable Package 生命周期：

```text
PGE

↓

Generate

↓

Validate

↓

Publish

↓

Runtime

↓

Assessment

↓

Archive
```

任何 Runtime。

都不能修改：

Playable Package。

只能消费。

---

# 8.13 Design Principles

Playable Package 遵循：

第一：

标准化。

第二：

可扩展。

第三：

跨平台。

第四：

可版本管理。

第五：

Runtime 无关。

Blueprint 与 Runtime 解耦。

---

# Chapter Summary

Playable Package 并不是游戏。

而是：

Experience Blueprint。

它定义：

体验应该如何发生。

Runtime。

负责真正让体验发生。

---

# Chapter 9. API Boundary

> API Boundary 定义 PGE 与其他系统之间的职责边界。

> Boundary 的核心不是接口协议，而是职责契约（Interface Contract）。

---

# 9.1 为什么需要 Boundary？

PlayableOS 是多个 Engine 协同工作的系统。

例如：

Knowledge Engine

PGE

Playable Runtime

Capability Engine

Assessment Engine

Agent System

如果没有明确边界。

系统将逐渐变成：

高耦合。

难维护。

难扩展。

因此。

每一个 Engine。

必须拥有明确职责。

---

# 9.2 Boundary Principle

PGE 的原则：

> **只负责设计，不负责运行。**

因此。

PGE：

负责：

Knowledge

↓

Playable Blueprint

Runtime：

负责：

Playable Blueprint

↓

Experience

Capability Engine：

负责：

Behavior

↓

Capability

Assessment Engine：

负责：

Behavior

↓

Assessment

每一个 Engine。

只负责一件事情。

---

# 9.3 Upstream Interface（上游接口）

PGE 接收：

Knowledge Package。

Knowledge Package 来源包括：

Knowledge Engine

Document Parser

Enterprise Knowledge Base

CMS

第三方知识平台

PGE 不负责：

知识采集。

知识存储。

知识管理。

---

# 9.4 Downstream Interface（下游接口）

PGE 输出：

Playable Blueprint。

Playable Runtime：

负责解析。

执行。

渲染。

AI Agent。

根据 Blueprint。

动态协同。

PGE 不直接参与 Runtime。

---

# 9.5 Runtime Boundary

Runtime 负责：

角色。

动画。

交互。

页面。

AI 对话执行。

事件。

数据采集。

Runtime 不负责：

重新设计体验。

任何体验设计。

必须来自：

Blueprint。

---

# 9.6 Capability Boundary

Capability Engine：

负责：

能力成长。

能力计算。

能力画像。

能力推荐。

PGE 不负责：

能力评分。

能力统计。

成长报告。

---

# 9.7 Assessment Boundary

Assessment Engine：

负责：

行为分析。

评分。

成长建议。

Assessment 可以读取：

Blueprint。

Behavior。

Capability。

但：

Assessment 不修改：

Blueprint。

---

# 9.8 Agent Boundary

Agent System：

负责：

执行 Blueprint。

例如：

Customer Agent。

Manager Agent。

Coach Agent。

Judge Agent。

Agent 可以：

即兴发挥。

但是：

不得违反：

Blueprint。

Blueprint 永远拥有最高优先级。

---

# 9.9 Data Boundary

PGE 不直接访问：

Behavior Database。

Capability Database。

Organization Database。

PGE 只读取：

Knowledge。

只输出：

Blueprint。

保持单向数据流。

---

# 9.10 Responsibility Matrix

| Engine | Responsibility |
|----------|----------------|
| Knowledge Engine | 管理知识 |
| PGE | 设计体验 |
| Runtime | 执行体验 |
| Assessment | 评估表现 |
| Capability | 更新能力 |
| Dashboard | 展示数据 |

任何 Engine。

不得越界。

---

# 9.11 Design Principles

Interface Contract：

遵循：

Single Responsibility

Low Coupling

High Cohesion

Immutable Blueprint

Event Driven

Blueprint First

Runtime Second

---

# Chapter Summary

PGE 是整个 PlayableOS 的设计中心。

它输出：

Blueprint。

Runtime。

Assessment。

Capability。

全部围绕：

Blueprint。

协同工作。

Blueprint。

成为整个系统唯一可信设计源（Single Source of Truth）。

---

# Chapter 10. Lifecycle

> Lifecycle 定义 Playable Blueprint 从创建到结束的完整生命周期。

> PGE 不只是生成一次 Blueprint，而是持续迭代 Blueprint。

---

# 10.1 为什么需要 Lifecycle？

传统 LMS。

课程生成以后。

基本不会变化。

PlayableOS 不一样。

Blueprint 不是静态资源。

Blueprint 是持续进化的。

每一次训练。

都会产生新的 Behavior。

Behavior 又会反过来优化 Blueprint。

因此。

Blueprint 是一个持续演化对象。

---

# 10.2 Blueprint Lifecycle

Blueprint 生命周期如下：

```text
Create

↓

Reason

↓

Generate

↓

Validate

↓

Publish

↓

Run

↓

Collect

↓

Evaluate

↓

Optimize

↓

Version

↓

Archive
```

每一个阶段。

都有明确职责。

---

# 10.3 Stage 1：Create

创建 Knowledge Package。

来源：

PPT。

PDF。

Word。

企业知识库。

视频。

等等。

输出：

Knowledge Package。

---

# 10.4 Stage 2：Reason

PGE 推理。

包括：

Knowledge Understanding。

Capability Mapping。

Scenario Construction。

Mechanic Selection。

Experience Composition。

输出：

Experience Blueprint。

Reason 是整个生命周期最重要阶段。

---

# 10.5 Stage 3：Generate

根据 Blueprint。

生成：

Playable Package。

注意。

Generate 并不是 AI 创造。

Generate 是：

Blueprint 的实例化。

---

# 10.6 Stage 4：Validate

Blueprint 发布之前。

必须完成验证。

包括：

Knowledge Validation

↓

Capability Validation

↓

Scenario Validation

↓

Mechanic Validation

↓

Runtime Validation

验证失败。

重新进入：

Reason。

---

# 10.7 Stage 5：Publish

Blueprint 发布。

Runtime 可以开始读取。

此时：

Blueprint 冻结。

Runtime 不允许修改 Blueprint。

Blueprint 成为：

Single Source of Truth。

---

# 10.8 Stage 6：Run

Runtime 根据 Blueprint。

动态生成：

体验。

AI Agent。

页面。

事件。

反馈。

员工正式开始训练。

---

# 10.9 Stage 7：Collect

Runtime 持续采集：

Behavior Event。

例如：

Dialogue。

Choice。

Retry。

Failure。

Completion。

所有 Behavior。

实时进入：

Behavior Engine。

---

# 10.10 Stage 8：Evaluate

Assessment Engine。

根据：

Behavior。

Capability。

Blueprint。

生成：

Assessment。

包括：

能力变化。

成长建议。

训练质量。

Blueprint 效果。

---

# 10.11 Stage 9：Optimize

Blueprint 不断优化。

例如：

某个 Challenge。

失败率：

95%。

AI 自动分析：

是否：

太难。

是否：

提示不足。

是否：

剧情不合理。

Blueprint 持续升级。

---

# 10.12 Stage 10：Version

Blueprint 支持版本。

例如：

v1.0

↓

v1.1

↓

v2.0

企业可以：

比较：

不同 Blueprint。

训练效果。

能力成长速度。

完成率。

Blueprint 成为企业数字资产。

---

# 10.13 Stage 11：Archive

Blueprint 生命周期结束。

进入：

Archive。

Blueprint 保留：

Knowledge。

Behavior。

Assessment。

Version。

供未来：

继续训练。

继续优化。

继续复用。

---

# 10.14 Continuous Learning Loop

Blueprint 形成持续飞轮。

```text
Knowledge

↓

Blueprint

↓

Runtime

↓

Behavior

↓

Assessment

↓

Optimization

↓

Blueprint
```

Blueprint。

不是一次生成。

而是持续成长。

---

# 10.15 Design Principles

Lifecycle 遵循：

Blueprint First

Immutable Runtime

Continuous Optimization

Version Driven

Behavior Driven

AI Native

所有优化。

均围绕：

Behavior。

展开。

---

# Chapter Summary

PGE 的最终产品不是一次生成。

而是一套能够持续学习、持续优化、持续成长的 Blueprint System。

Blueprint 将随着企业成长不断演化。

因此。

PlayableOS 不只是 AI 生成平台。

更是一套持续进化的能力设计系统。
