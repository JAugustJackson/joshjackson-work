import Link from "next/link";
import type { WorkItem } from "@/content/work";

export function WorkCard({
  item,
  featured = false,
}: {
  item: WorkItem;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={`group flex h-full min-w-0 flex-col justify-between border border-line bg-paper-raised p-[clamp(1.25rem,2.4vw,2rem)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent ${
        featured ? "min-h-[18rem] xl:min-h-[22rem]" : "min-h-[16rem]"
      }`}
    >
      <div>
        <p className="font-display text-[clamp(1.45rem,2.4vw,2.15rem)] leading-[1.1] break-words text-ink group-hover:text-accent">
          {item.title}
        </p>
        <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed break-words text-ink-muted">
          {item.oneLiner}
        </p>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {item.chips.map((chip) => (
          <li
            key={chip}
            className="border border-line bg-paper px-2.5 py-1 text-xs text-ink"
          >
            {chip}
          </li>
        ))}
      </ul>
    </Link>
  );
}
