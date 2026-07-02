import Link from "next/link";
import { notFound } from "next/navigation";
import { BlueprintVisualizer } from "@/components/BlueprintVisualizer";
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
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/studio"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--muted)] transition hover:text-[var(--brand)]"
        >
          ← 返回 Studio
        </Link>

        <header className="mb-8">
          <p className="text-sm font-medium text-[var(--brand)]">
            Blueprint Visualizer
          </p>
          <h1 className="mt-1 text-3xl font-bold">{blueprint.metadata.title}</h1>
          <p className="mt-2 text-[var(--muted)]">
            PGE 输出的 Experience Blueprint 可视化 — Runtime 的执行路径
          </p>
        </header>

        <BlueprintVisualizer blueprint={blueprint} />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoCard title="训练目标" value={blueprint.capability.target} />
          <InfoCard
            title="学习目标"
            value={blueprint.capability.learning_objective}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold">评估维度</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {blueprint.assessment.dimensions.map((d) => (
              <span
                key={d.name}
                className="rounded-full bg-[var(--brand-light)] px-3 py-1 text-sm text-[var(--brand-dark)]"
              >
                {d.name} ({Math.round(d.weight * 100)}%)
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <h3 className="text-sm font-medium text-[var(--muted)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{value}</p>
    </div>
  );
}
