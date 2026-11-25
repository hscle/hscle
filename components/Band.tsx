import type { ReactNode } from "react";

/** Coloured page header: an icon tile, optional breadcrumbs, the h1 and a short line under it. */
export function Band({
  accent,
  icon,
  crumbs,
  title,
  children,
}: {
  /** Any CSS colour, e.g. a subject colour or "var(--gold)". */
  accent: string;
  icon: ReactNode;
  crumbs?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="band" style={{ ["--accent" as string]: accent }}>
      <span className="glyph big" aria-hidden="true">
        {icon}
      </span>
      <div>
        {crumbs && <div className="crumbs">{crumbs}</div>}
        <h1>{title}</h1>
        {children && <p className="muted">{children}</p>}
      </div>
    </div>
  );
}

export const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" strokeWidth="2.6" />
  </svg>
);

export const GaugeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 17a8.5 8.5 0 0 1 17 0" />
    <path d="M12 17l4.2-5.2" />
    <circle cx="12" cy="17" r="1.4" fill="currentColor" />
  </svg>
);
