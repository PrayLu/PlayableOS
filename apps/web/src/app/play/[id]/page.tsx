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
    <div className="relative min-h-[100dvh] bg-black">
      <Link
        href="/studio"
        className="absolute left-4 top-4 z-[60] rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white/60 backdrop-blur-md transition hover:text-white md:left-8 md:top-8"
      >
        ← 返回 Studio
      </Link>
      <PlayablePlayer blueprint={blueprint} />
    </div>
  );
}
