import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/content/load";

export function Chips({ chips }: { chips: string[] }) {
  if (chips.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Focus areas">
      {chips.map((chip) => (
        <li key={chip} className="chip">
          {chip}
        </li>
      ))}
    </ul>
  );
}

export function PortfolioCard({
  item,
  layout = "column",
  priority = false,
}: {
  item: PortfolioItem;
  layout?: "column" | "row";
  priority?: boolean;
}) {
  const row = layout === "row";
  return (
    <article
      className={`group relative grid content-start gap-3.5 ${
        row
          ? "items-center sm:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] sm:gap-6 xl:grid-cols-[minmax(0,27rem)_minmax(0,32rem)]"
          : ""
      }`}
    >
      <div className="relative aspect-[387/203] overflow-hidden rounded-[14px] bg-chip">
        <Image
          src={item.card.image}
          alt={item.card.imageAlt}
          fill
          priority={priority}
          sizes={row ? "(min-width: 640px) 27rem, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-[1.125rem] leading-snug font-medium uppercase tracking-[0.01em] text-ink">
          <Link
            href={`/portfolio/${item.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
          >
            {item.title}
          </Link>
        </h3>
        <div className="mt-1.5">
          <Chips chips={item.chips} />
        </div>
        <p className="mt-2 max-w-[40ch] text-[0.9375rem] leading-[1.45] text-ink">
          {item.card.summary}
        </p>
      </div>
    </article>
  );
}
