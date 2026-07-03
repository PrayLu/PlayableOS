import Link from "next/link";
import { BlueprintVisualizer } from "@/components/BlueprintVisualizer";
import { AppShell } from "@/components/ui/AppShell";
import {
  DEFAULT_PLAYABLE_ID,
  getBlueprint,
  listBlueprints,
} from "@/lib/blueprints";

export default async function HomePage() {
  const blueprint = await getBlueprint(DEFAULT_PLAYABLE_ID);
  const all = await listBlueprints();

  return (
    <AppShell
      subtitle="Make Every Knowledge Playable"
      maxWidth="5xl"
      links={[
        { href: "/studio", label: "Studio" },
        { href: "/dashboard", label: "数据看板" },
      ]}
    >
      <section className="relative py-8 text-center md:py-16">
        <div className="label-caps">AI 企业能力成长平台</div>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          让每一份知识
          <br />
          <span className="text-gradient">都变得可以玩转起来</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          上传企业 Word 或 PDF 文档，AI 自动分析并生成沉浸式视听训练体验，
          将静态知识转化为可感知、可评估的能力成长路径。
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/studio" className="btn-primary px-8 py-4 text-base">
            进入 Studio 创建训练 →
          </Link>
          <Link href={`/play/${DEFAULT_PLAYABLE_ID}`} className="btn-secondary px-8 py-4 text-base">
            体验示例训练
          </Link>
          <Link href="/dashboard" className="btn-secondary px-8 py-4 text-base">
            查看数据看板
          </Link>
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: "◈",
            title: "Knowledge",
            desc: "上传 Word / PDF 企业知识文档，KPG 智能解析核心要点",
            gradient: "from-indigo-500/20 to-blue-500/10",
          },
          {
            icon: "◎",
            title: "Playable",
            desc: "PGE 自动生成情景对话、选择分支与能力评估 Blueprint",
            gradient: "from-violet-500/20 to-purple-500/10",
          },
          {
            icon: "◉",
            title: "Capability",
            desc: "员工沉浸式体验后获得维度化能力成长报告",
            gradient: "from-fuchsia-500/20 to-pink-500/10",
          },
        ].map((item) => (
          <div
            key={item.title}
            className={`glass-card glass-card--glow bg-gradient-to-br ${item.gradient} p-6`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-lg text-indigo-200">
              {item.icon}
            </div>
            <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="label-caps">Library</p>
            <h2 className="mt-1 text-2xl font-bold">Playable 库</h2>
          </div>
          <span className="badge badge-brand">{all.length} 个训练</span>
        </div>

        <div className="mt-5 space-y-3">
          {all.map(({ id, blueprint: bp, source, sourceFileName }) => (
            <Link
              key={id}
              href={`/play/${id}`}
              className="glass-card glass-card--glow group flex items-center justify-between p-5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold group-hover:text-indigo-200 transition-colors">
                    {bp.metadata.title}
                  </p>
                  {source === "generated" && (
                    <span className="badge badge-success">AI 生成</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {sourceFileName ?? bp.metadata.description}
                </p>
              </div>
              <span className="badge badge-brand shrink-0">
                {bp.metadata.duration_minutes} 分钟
              </span>
            </Link>
          ))}
        </div>
      </section>

      {blueprint && (
        <section className="mt-16">
          <p className="label-caps">Blueprint</p>
          <h2 className="mt-1 mb-5 text-2xl font-bold">Experience Blueprint 预览</h2>
          <div className="glass-card glass-card--glow overflow-hidden p-4">
            <BlueprintVisualizer blueprint={blueprint} />
          </div>
        </section>
      )}
    </AppShell>
  );
}
