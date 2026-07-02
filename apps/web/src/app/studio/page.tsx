import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

interface StudioPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function StudioPage({ searchParams }: StudioPageProps) {
  const { id } = await searchParams;
  return <StudioWorkspace initialId={id} />;
}
