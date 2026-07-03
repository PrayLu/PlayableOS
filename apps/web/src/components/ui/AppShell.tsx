import { GlowBackground } from "./GlowBackground";
import { AppNav, type NavLink } from "./AppNav";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  links?: NavLink[];
  badge?: React.ReactNode;
  footer?: boolean;
  maxWidth?: "5xl" | "6xl";
}

export function AppShell({
  children,
  title,
  subtitle,
  links,
  badge,
  footer = true,
  maxWidth = "6xl",
}: AppShellProps) {
  const widthClass = maxWidth === "5xl" ? "max-w-5xl" : "max-w-6xl";

  return (
    <div className="relative min-h-screen">
      <GlowBackground />
      <AppNav title={title} subtitle={subtitle} links={links} badge={badge} />
      <main className={`mx-auto ${widthClass} px-6 py-10`}>{children}</main>
      {footer && (
        <footer className="border-t border-[var(--glass-border)] py-8 text-center text-sm text-[var(--text-muted)]">
          PlayableOS · Knowledge → Playable → Capability
        </footer>
      )}
    </div>
  );
}
