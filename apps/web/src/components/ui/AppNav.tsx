import Link from "next/link";

export type NavLink = {
  href: string;
  label: string;
  active?: boolean;
};

interface AppNavProps {
  title?: string;
  subtitle?: string;
  links?: NavLink[];
  badge?: React.ReactNode;
}

export function AppNav({ title = "PlayableOS", subtitle, links = [], badge }: AppNavProps) {
  return (
    <nav className="app-nav">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <span className="logo-mark">P</span>
          <div>
            <p className="font-bold tracking-tight">{title}</p>
            {subtitle && (
              <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
            )}
          </div>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {badge}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`app-nav__link ${link.active ? "app-nav__link--active font-medium" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
