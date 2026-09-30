import type { Metadata } from "next";
import Image from "next/image";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { getImageSize, getPage, getPortfolioItems } from "@/lib/content/load";
import { Markdown } from "@/lib/content/markdown";

export function generateMetadata(): Metadata {
  const { data } = getPage("portfolio");
  return { title: data.title, description: data.subtitle };
}

export default function PortfolioPage() {
  const { data: page, body } = getPage("portfolio");
  const items = getPortfolioItems();
  const brands = page.brands.map((brand) => {
    const size = getImageSize(brand.logo, "content/pages/portfolio.md");
    const scale = Math.min(150 / size.width, 64 / size.height);
    return {
      ...brand,
      width: Math.round(size.width * scale),
      height: Math.round(size.height * scale),
    };
  });

  return (
    <main id="main" className="min-w-0">
      <header className="box-pad pt-[clamp(1.875rem,4.2vw,3.75rem)]">
        <h1 className="page-title text-ink">{page.title}</h1>
        <p className="page-subtitle mt-3 text-ink">{page.subtitle}</p>
        <Markdown
          source={body}
          where="content/pages/portfolio.md"
          className="prose-jj prose-intro mt-[clamp(1.75rem,3vw,2.5rem)]"
        />
      </header>

      <section className="box-pad section-y" aria-labelledby="portfolio-items">
        <h2 id="portfolio-items" className="section-heading text-ink">
          {page.itemsHeading}
        </h2>
        <div className="mt-[clamp(1.5rem,2.5vw,2.5rem)] grid gap-10 md:gap-8">
          {items.map((item, index) => (
            <PortfolioCard key={item.slug} item={item} layout="row" priority={index < 2} />
          ))}
        </div>
      </section>

      {brands.length > 0 ? (
        <section className="box-pad section-y" aria-labelledby="brands">
          <h2 id="brands" className="section-heading text-ink">
            {page.brandsHeading}
          </h2>
          <ul className="mt-[clamp(1.5rem,2.5vw,2.5rem)] grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {brands.map((brand) => (
              <li key={brand.name} className="flex h-16 items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  unoptimized={brand.logo.endsWith(".svg")}
                  className="opacity-85 dark:invert"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
