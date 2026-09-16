import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, work } from "@/content/work";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return { title: "Work" };
  return {
    title: item.title,
    description: item.oneLiner,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <main id="main" className="page-pad section-y min-w-0">
      <p className="text-sm text-ink-muted">
        <Link href="/work" className="hover:text-accent">
          Work
        </Link>
      </p>
      <h1 className="font-display mt-4 max-w-full text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.95] break-words text-ink">
        {item.title}
      </h1>
      <ul className="mt-6 flex flex-wrap gap-2">
        {item.chips.map((chip) => (
          <li
            key={chip}
            className="border border-line px-2.5 py-1 text-xs text-ink"
          >
            {chip}
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-[62ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-ink">
        {item.oneLiner}
      </p>
      <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {item.role ? (
          <div>
            <dt className="text-sm text-ink-muted">Role</dt>
            <dd className="mt-1 text-ink">{item.role}</dd>
          </div>
        ) : null}
        {item.timeline ? (
          <div>
            <dt className="text-sm text-ink-muted">Context</dt>
            <dd className="mt-1 text-ink">{item.timeline}</dd>
          </div>
        ) : null}
        {item.liveUrl ? (
          <div>
            <dt className="text-sm text-ink-muted">Live</dt>
            <dd className="mt-1">
              <a
                href={item.liveUrl}
                className="text-accent underline-offset-4 hover:underline"
              >
                {item.liveLabel ?? item.liveUrl}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
      <div className="mt-14 grid gap-12 lg:grid-cols-2 xl:gap-16">
        {item.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-[clamp(1.35rem,2vw,1.85rem)] text-ink">
              {section.heading}
            </h2>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-ink-muted">
              {section.body}
            </p>
          </section>
        ))}
      </div>
      <div className="mt-16 aspect-[16/9] border border-dashed border-line bg-paper-raised p-6 text-sm text-ink-muted">
        Visuals TBD
      </div>
    </main>
  );
}
