import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { SwipeHint } from "@/components/portfolio/SwipeHint";
import { SwipeNav } from "@/components/portfolio/SwipeNav";
import {
  getAdjacentItems,
  getPortfolioItem,
  getPortfolioItems,
  type PortfolioItem,
} from "@/lib/content/load";
import { Markdown } from "@/lib/content/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPortfolioItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};
  return { title: item.title, description: item.subtitle };
}

const LEAD_BLOCK = /^(#|!\[|>|[-*+] |\d+\. |<|\||```)/;

function splitLede(body: string) {
  const [first = "", ...rest] = body.split(/\n\s*\n/);
  if (!first.trim() || LEAD_BLOCK.test(first.trim())) return { lede: "", rest: body };
  return { lede: first, rest: rest.join("\n\n") };
}

const metaLabels = {
  role: "Role",
  timeline: "Timeline",
  stack: "Stack",
  team: "Team",
  outcome: "Outcome",
} as const;

function MetaTable({ meta }: { meta: PortfolioItem["meta"] }) {
  const entries = (Object.keys(metaLabels) as (keyof typeof metaLabels)[])
    .map((key) => ({ key, value: meta[key] }))
    .filter((entry): entry is { key: keyof typeof metaLabels; value: string } => Boolean(entry.value));
  if (entries.length === 0) return null;

  let column = 0;
  const cells = entries.map((entry, index) => {
    const remaining = entries.length - index;
    const wide = entry.key === "outcome" || (column === 0 && remaining === 1);
    column = wide ? 0 : (column + 1) % 2;
    return { ...entry, wide };
  });

  return (
    <dl className="grid gap-px overflow-hidden rounded-[8px] border border-line-strong bg-line-strong md:grid-cols-2">
      {cells.map((cell) => (
        <div key={cell.key} className={`bg-paper px-4 py-3.5 ${cell.wide ? "md:col-span-2" : ""}`}>
          <dt className="text-[1.0625rem] font-bold uppercase text-accent">{metaLabels[cell.key]}</dt>
          <dd className="mt-1.5 text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.7] text-ink">{cell.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function AdjacentLink({ item, direction }: { item: PortfolioItem; direction: "prev" | "next" }) {
  const next = direction === "next";
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      rel={direction}
      className={`group flex flex-col gap-1 rounded-[8px] border border-line-strong px-5 py-4 transition-colors hover:border-accent ${
        next ? "items-end text-right" : ""
      }`}
    >
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
        {next ? null : <ArrowLeft size={14} weight="bold" aria-hidden="true" />}
        {next ? "Next" : "Previous"}
        {next ? <ArrowRight size={14} weight="bold" aria-hidden="true" /> : null}
      </span>
      <span className="text-lg font-medium uppercase text-ink transition-colors group-hover:text-accent">
        {item.title}
      </span>
    </Link>
  );
}

export default async function PortfolioItemPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const { prev, next } = getAdjacentItems(slug);
  const { lede, rest } = splitLede(item.body);
  const where = `content/portfolio/${slug}.md`;

  return (
    <main id="main" className="min-w-0">
      <article>
        <header className="box-pad pt-[clamp(1.875rem,4.2vw,3.75rem)]">
          <h1 className="page-title text-ink">{item.title}</h1>
          <p className="page-subtitle mt-3 text-ink">{item.subtitle}</p>
          {lede ? (
            <Markdown source={lede} where={where} className="prose-jj mt-[clamp(1.5rem,2.5vw,2.25rem)]" />
          ) : null}
          <div className="mt-[clamp(1.75rem,3vw,2.9rem)]">
            <MetaTable meta={item.meta} />
          </div>
          {item.live ? (
            <a
              href={item.live.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
            >
              Live at {item.live.label}
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          ) : null}
        </header>

        {rest ? (
          <div className="box-pad pt-[clamp(1.5rem,2.5vw,2.5rem)]">
            <Markdown source={rest} where={where} />
          </div>
        ) : null}
      </article>

      {prev.slug !== item.slug ? (
        <>
          <nav
            aria-label="More portfolio items"
            className="box-pad section-y grid gap-4 sm:grid-cols-2"
          >
            <AdjacentLink item={prev} direction="prev" />
            <AdjacentLink item={next} direction="next" />
          </nav>
          <SwipeNav prevHref={`/portfolio/${prev.slug}`} nextHref={`/portfolio/${next.slug}`} />
          <SwipeHint />
        </>
      ) : null}
    </main>
  );
}
