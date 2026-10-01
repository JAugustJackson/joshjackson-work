import type { Metadata } from "next";
import { ContactBlock } from "@/components/ContactBlock";
import { FaIcon } from "@/components/icons/FaIcon";
import { getPage, getSite } from "@/lib/content/load";
import { Markdown } from "@/lib/content/markdown";

export function generateMetadata(): Metadata {
  const site = getSite();
  const { data } = getPage("about");
  return { title: data.title, description: `${site.name}, ${data.subtitle}.` };
}

export default function AboutPage() {
  const site = getSite();
  const { data: about, body } = getPage("about");

  return (
    <main id="main" className="min-w-0">
      <header className="box-pad pt-[clamp(1.875rem,4.2vw,3.75rem)]">
        <h1 className="page-title text-ink">{about.title}</h1>
        <p className="page-subtitle mt-3 text-ink">{about.subtitle}</p>
        <div className="mt-[clamp(1.75rem,3vw,2.5rem)] grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] xl:gap-16">
          <Markdown source={body} where="content/pages/about.md" className="prose-jj prose-intro" />
          <div className="min-w-0 lg:border-l lg:border-accent lg:pl-6 xl:pl-8">
            <ContactBlock />
            <a href={site.resumePdf.href} className="btn-accent mt-6">
              {site.resumePdf.label}
              <FaIcon icon="solid/arrow-down-to-line" size={14} />
            </a>
          </div>
        </div>
        {about.clients.length > 0 ? (
          <p className="mt-8 text-sm uppercase tracking-[0.14em] text-ink-muted">
            <span className="sr-only">Clients and brands: </span>
            {about.clients.join(" · ")}
          </p>
        ) : null}
      </header>

      <section className="box-pad section-y" aria-labelledby="highlights">
        <h2 id="highlights" className="section-heading text-ink">
          Highlights
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {about.highlights.map((item) => (
            <li key={item.label} className="border-t border-line pt-4">
              <p className="font-medium text-ink">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="box-pad section-y" aria-labelledby="experience">
        <h2 id="experience" className="section-heading text-ink">
          Experience
        </h2>
        <ol className="mt-8 grid gap-12">
          {about.jobs.map((job) => (
            <li
              key={`${job.company}-${job.dates}`}
              className="grid gap-3 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_auto]"
            >
              <div>
                <h3 className="text-[clamp(1.15rem,1.6vw,1.45rem)] font-medium text-ink">
                  {job.role} - {job.company} ({job.location})
                </h3>
                {job.path ? <p className="mt-1 text-sm text-ink-muted">{job.path}</p> : null}
                <ul className="mt-4 max-w-[72ch] list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-ink">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <p className="font-medium text-accent lg:text-right">{job.dates}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="box-pad section-y" aria-labelledby="early-career">
        <h2 id="early-career" className="section-heading text-ink">
          Early career
        </h2>
        <p className="mt-4 max-w-[70ch] leading-relaxed text-ink">{about.earlyCareer}</p>
      </section>

      <section className="box-pad section-y" aria-labelledby="skills">
        <h2 id="skills" className="section-heading text-ink">
          Skills and tools
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {about.skills.map((item) => (
            <li key={item.label}>
              <p className="font-medium text-ink">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
