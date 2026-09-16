import { profile } from "@/content/profile";

const items = [
  { label: "Location", value: profile.location },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
  { label: "Profile", value: profile.linkedinLabel, href: profile.linkedinHref },
  { label: "Email", value: profile.email, href: profile.emailHref },
] as const;

export function ContactBlock({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <ul
      className={`grid w-full min-w-0 gap-x-4 ${
        compact
          ? "grid-cols-1 text-sm sm:grid-cols-2 lg:grid-cols-1"
          : "grid-cols-1 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-1 lg:text-[clamp(0.85rem,1.05vw,1.05rem)]"
      }`}
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-baseline gap-3 py-1 sm:grid-cols-[7.25rem_minmax(0,1fr)]"
        >
          <span className="font-display text-[0.68rem] uppercase tracking-[0.12em] text-ink-muted">
            {item.label}
          </span>
          {"href" in item && item.href ? (
            <a
              href={item.href}
              className="min-w-0 [overflow-wrap:anywhere] text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {item.value}
            </a>
          ) : (
            <span className="min-w-0 [overflow-wrap:anywhere] text-ink">
              {item.value}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
