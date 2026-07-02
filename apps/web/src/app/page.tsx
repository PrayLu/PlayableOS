import Link from "next/link";
import { BlueprintVisualizer } from "@/components/BlueprintVisualizer";
import {
  DEFAULT_PLAYABLE_ID,
  getBlueprint,
  listBlueprints,
} from "@/lib/blueprints";

export default async function HomePage() {
  const blueprint = await getBlueprint(DEFAULT_PLAYABLE_ID);
  const all = await listBlueprints();

  return (
    <div className="min-h-screen">
      <nav className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-bold text-white">
              P
            </span>
            <span className="font-bold">PlayableOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/studio"
              className="text-sm font-medium text-[var(--brand)] transition hover:text-[var(--brand-dark)]"
            >
              Studio →
            </Link>
            <p className="hidden text-sm text-[var(--muted)] sm:block">
              Make Every Knowledge Playable
            </p>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--brand)]">
            AI 企业能力成长平台
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            让每一份知识，都变得可以玩转起来
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            上传企业 Word 文档，AI 自动分析并生成沉浸式视听训练体验。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/studio"
              className="rounded-xl bg-[var(--brand)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-[var(--brand-dark)]"
            >
              进入 Studio 创建训练 →
            </Link>
            <Link
              href={`/play/${DEFAULT_PLAYABLE_ID}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-8 py-4 text-base font-semibold transition hover:border-[var(--brand)] hover:bg-[var(--brand-light)]"
            >
              体验示例训练
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: "📄", title: "Knowledge", desc: "上传 Word 企业知识文档" },
            { icon: "🤖", title: "Playable", desc: "DeepSeek 自动生成情景训练" },
            { icon: "📈", title: "Capability", desc: "员工体验后获得能力成长报告" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-bold">Playable 库</h2>
          <div className="mt-4 space-y-3">
            {all.map(({ id, blueprint: bp, source, sourceFileName }) => (
              <Link
                key={id}
                href={`/play/${id}`}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--brand)] hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{bp.metadata.title}</p>
                    {source === "generated" && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                        AI 生成
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {sourceFileName ?? bp.metadata.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--brand-light)] px-3 py-1 text-xs font-medium text-[var(--brand-dark)]">
                  {bp.metadata.duration_minutes} 分钟
                </span>
              </Link>
            ))}
          </div>
        </section>

        {blueprint && (
          <section className="mt-16">
            <h2 className="mb-4 text-xl font-bold">Experience Blueprint 预览</h2>
            <BlueprintVisualizer blueprint={blueprint} />
          </section>
        )}
      </main>

      <footer className="mt-20 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
        PlayableOS · Knowledge → Playable → Capability
      </footer>
    </div>
  );
}
