import Link from "next/link";
import { notFound } from "next/navigation";
import { BlueprintVisualizer } from "@/components/BlueprintVisualizer";
import { AppShell } from "@/components/ui/AppShell";
import { DEFAULT_PLAYABLE_ID, getBlueprint } from "@/lib/blueprints";

interface VisualizerPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function VisualizerPage({
  searchParams,
}: VisualizerPageProps) {
  const { id } = await searchParams;
  const blueprint = await getBlueprint(id ?? DEFAULT_PLAYABLE_ID);

  if (!blueprint) {
    notFound();
  }

  return (
    <AppShell
      title="Blueprint Visualizer"
      subtitle={blueprint.metadata.title}
      maxWidth="5xl"
      links={[
        { href: "/studio", label: "Studio" },
        { href: `/play/${id ?? DEFAULT_PLAYABLE_ID}`, label: "开始训练" },
      ]}
    >
      <Link href="/studio" className="btn-ghost mb-6 inline-flex gap-1">
        ← 返回 Studio
      </Link>

      <header className="mb-8">
        <p className="label-caps">Experience Blueprint</p>
        <h1 className="mt-2 text-3xl font-bold">{blueprint.metadata.title}</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          PGE 输出的体验蓝图可视化 — Runtime 的执行路径与节点流转
        </p>
      </header>

      <div className="glass-card glass-card--glow overflow-hidden p-4">
        <BlueprintVisualizer blueprint={blueprint} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <InfoCard title="训练目标" value={blueprint.capability.target} />
        <InfoCard
          title="学习目标"
          value={blueprint.capability.learning_objective}
        />
      </div>

      <div className="glass-card glass-card--glow mt-6 p-6">
        <h3 className="font-semibold">评估维度</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {blueprint.assessment.dimensions.map((d) => (
            <span key={d.name} className="badge badge-brand px-3 py-1.5 text-sm">
              {d.name} ({Math.round(d.weight * 100)}%)
            </span>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="glass-card glass-card--glow p-5">
      <h3 className="text-sm font-medium text-[var(--text-muted)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        {value}
      </p>
    </div>
  );
}
