import { DashboardClient } from "@/components/dashboard/DashboardClient";

interface DashboardPageProps {
  searchParams: Promise<{ playable?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { playable } = await searchParams;
  return <DashboardClient initialPlayableId={playable} />;
}
