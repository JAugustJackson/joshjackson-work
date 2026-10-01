import Image from "next/image";
import Link from "next/link";
import { FaIcon } from "@/components/icons/FaIcon";
import { ContactBlock } from "@/components/ContactBlock";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { ToolsSection } from "@/components/ToolsSection";
import { TypeOnName } from "@/components/TypeOnName";
import {
  getFeaturedTools,
  getPage,
  getPortfolioItems,
  getSite,
  getToolsCatalog,
} from "@/lib/content/load";
import { Markdown } from "@/lib/content/markdown";

export default function HomePage() {
  const site = getSite();
  const { data: home, body } = getPage("home");
  const featured = getPortfolioItems().filter((item) => item.featured);
  const catalog = getToolsCatalog();

  return (
    <main id="main" className="min-w-0">
      <section className="box-pad pt-[clamp(1.875rem,4.2vw,3.75rem)] pb-[clamp(2rem,3.5vw,3rem)]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 xl:gap-16">
          <div className="min-w-0">
            <TypeOnName name={site.displayName} />
            <p className="page-subtitle mt-3 text-ink">{site.title}</p>
          </div>
          <div className="min-w-0 lg:border-l lg:border-accent lg:pl-6 xl:pl-8">
            <ContactBlock />
          </div>
        </div>
        <Markdown
          source={body}
          where="content/pages/home.md"
          className="prose-intro body-lg mt-[clamp(1.75rem,3vw,2.5rem)] max-w-[88ch] text-ink"
        />
      </section>

      <section className="box-pad section-y" aria-labelledby="selected-work">
        <h2 id="selected-work" className="section-heading text-ink">
          {home.selectedWork.heading}
        </h2>
        <div className="mt-[clamp(1.5rem,2.5vw,2.5rem)] grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <PortfolioCard key={item.slug} item={item} priority={index < 3} />
          ))}
        </div>
      </section>

      <section className="box-pad section-y" aria-labelledby="about-teaser">
        <h2 id="about-teaser" className="section-heading text-ink">
          {home.about.heading}
        </h2>
        <div className="mt-[clamp(1.5rem,2.5vw,2.5rem)] grid items-center gap-8 md:grid-cols-[minmax(12rem,24rem)_minmax(0,1fr)] xl:gap-10">
          <div className="relative aspect-[386/446] max-w-sm overflow-hidden rounded-[14px] bg-chip md:max-w-none">
            <Image
              src={home.about.image}
              alt={home.about.imageAlt}
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-[62ch]">
            <p className="body-lg text-ink">{home.about.blurb}</p>
            <Link href={home.about.cta.href} className="btn-accent mt-6">
              {home.about.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="box-pad section-y" aria-labelledby="tools">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="tools" className="section-heading text-ink">
            {home.tools.heading}
          </h2>
          <Link
            href={home.tools.cta.href}
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
          >
            {home.tools.cta.label}
            <FaIcon icon="solid/arrow-right" size={14} />
          </Link>
        </div>
        <div className="mt-[clamp(1.5rem,2.5vw,2.5rem)]">
          <ToolsSection
            tools={getFeaturedTools()}
            groups={catalog.groups}
            labels={catalog.proficiency}
            filterable={false}
          />
        </div>
      </section>
    </main>
  );
}
