# PlayableOS

> Make Every Knowledge Playable.

AI 驱动的企业能力成长平台。

## MVP Demo

第一个 Playable：**企业文化学习** — 通过情景对话帮助新员工理解并践行公司价值观。

### 快速开始

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
# 填入 DEEPSEEK_API_KEY（PGE 生成）和 VOLCENGINE_TTS_API_KEY（配音）
pnpm dev
```

打开 [http://localhost:3000/studio](http://localhost:3000/studio) 上传 Word 文档，AI 自动生成专属 Playable。

### Studio 工作流

```text
上传 .docx → DeepSeek 分析 → 生成 Blueprint → 预览 → 体验训练
```

### 项目结构

```text
packages/
  blueprint-schema/   # Playable Blueprint JSON Schema (Zod)
  runtime/            # Playable 执行引擎
apps/
  web/                # Next.js — Studio + Player + PGE API
fixtures/
  blueprints/         # Seed Blueprint 数据
docs/                 # 产品 & 技术文档
```

### 核心链路

```text
Knowledge → PGE (DeepSeek) → Playable Blueprint → Runtime → Capability
```

### AI 生成（DeepSeek）

- 配置 `DEEPSEEK_API_KEY` 启用 PGE 文档分析与 Blueprint 生成
- 获取 Key：[DeepSeek 开放平台](https://platform.deepseek.com/api_keys)

### AI 配音（火山引擎豆包语音）

每个角色可配置独立 `voice_id`（火山 speaker），使用 `seed-tts-2.0-standard` 模型生成中文语音。

- 配置 `apps/web/.env.local` 中的 `VOLCENGINE_TTS_API_KEY`
- 在[火山引擎语音控制台](https://console.volcengine.com/speech/service/10007)开通「豆包语音合成大模型」并创建 API Key
- 未配置时自动降级为浏览器系统语音
- 客户端缓存已生成的音频，同一句台词不重复请求

## License

Private
