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

### 在线 Demo（Vercel）

将 `apps/web` 部署到 [Vercel](https://vercel.com) 后，即可分享公网链接给他人体验（无需本地 `localhost`）。

**一键部署：** [Import PlayableOS on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/PrayLu/PlayableOS&root-directory=apps%2Fweb)

**手动配置：**

1. [Vercel](https://vercel.com) → Add New Project → 导入 `PrayLu/PlayableOS`
2. **Root Directory** 设为 `apps/web`
3. 开启 **Include source files outside of the Root Directory**（monorepo 必须）
4. Framework 选 **Next.js**（会使用 `apps/web/vercel.json` 中的构建命令）
5. Environment Variables 填入：

| 变量 | 说明 |
|------|------|
| `DEEPSEEK_API_KEY` | [DeepSeek API Key](https://platform.deepseek.com/api_keys)，Studio 生成必需 |
| `DEEPSEEK_MODEL` | 可选，默认 `deepseek-chat` |
| `VOLCENGINE_TTS_API_KEY` | 火山引擎 TTS，未配置时降级为浏览器语音 |
| `VOLCENGINE_TTS_RESOURCE_ID` | 可选，默认 `seed-tts-2.0` |
| `TTS_PROVIDER` | 可选，默认 `volcengine` |

6. Deploy

**部署后可分享：**

- 首页 / 示例训练：`https://你的域名.vercel.app`
- 体验王阳明：`https://你的域名.vercel.app/play/yangming-gaoyu`
- Studio：`https://你的域名.vercel.app/studio`
- 公司 Blueprint（GitHub Pages）：`https://praylu.github.io/PlayableOS/blueprint/index.html`

**注意：** Vercel 免费版 API 函数最长约 10 秒，完整 Studio 生成可能超时；内置示例 Playable 可正常体验。持久化生成的训练需 Pro 计划或后续接入数据库。

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
