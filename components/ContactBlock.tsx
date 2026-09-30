import { getSite } from "@/lib/content/load";

export function ContactBlock({
  size = "md",
  labelFont = "sans",
}: {
  size?: "sm" | "md";
  labelFont?: "sans" | "display";
}) {
  const { contact } = getSite();

  return (
    <ul
      className={`grid w-full min-w-0 ${
        size === "sm" ? "text-sm" : "text-[0.94375rem]"
      }`}
    >
      {contact.map((item) => (
        <li
          key={item.label}
          className="grid min-w-0 grid-cols-[4.25rem_minmax(0,1fr)] items-baseline gap-3 py-1 sm:grid-cols-[5.5rem_minmax(0,1fr)]"
        >
          <span
            className={`text-[0.68rem] uppercase tracking-[0.02em] text-ink ${
              labelFont === "display" ? "font-display" : ""
            }`}
          >
            {item.label}
          </span>
          {item.href ? (
            <a
              href={item.href}
              className="min-w-0 [overflow-wrap:anywhere] text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
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
