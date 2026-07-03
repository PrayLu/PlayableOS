import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayablePlayer } from "@/components/PlayablePlayer";
import { getBlueprint } from "@/lib/blueprints";

interface PlayPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params;
  const blueprint = await getBlueprint(id);

  if (!blueprint) {
    notFound();
  }

  return (
    <div className="relative min-h-[100dvh] bg-[var(--bg-base)]">
      <Link
        href="/studio"
        className="absolute left-4 top-4 z-[60] flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-black/60 px-4 py-2 text-xs text-white/70 backdrop-blur-md transition hover:border-violet-400/30 hover:text-white md:left-8 md:top-8"
      >
        ← 返回 Studio
      </Link>
      <PlayablePlayer blueprint={blueprint} playableId={id} />
    </div>
  );
}
