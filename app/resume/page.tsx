import type { Metadata } from "next";
import { ArrowSquareOut } from "@phosphor-icons/react/ssr";
import { ContactBlock } from "@/components/ContactBlock";
import { profile } from "@/content/profile";
import { resume, resumeMeta } from "@/content/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name}, ${resume.title}.`,
};

export default function ResumePage() {
  return (
    <main id="main" className="page-pad section-y min-w-0">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-display site-name text-ink">{profile.name}</h1>
        <a
          href={resumeMeta.pdfHref}
          className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent"
        >
          {resumeMeta.pdfLabel}
          <ArrowSquareOut size={16} weight="bold" />
        </a>
      </div>
      <div className="mt-8 grid gap-10 border-t border-accent pt-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] xl:gap-16">
        <p className="max-w-[70ch] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed text-ink">
          {resume.profile}
        </p>
        <div>
          <p className="mb-4 text-[0.95rem] text-ink">{resume.title}</p>
          <ContactBlock />
        </div>
      </div>

      <section className="mt-[clamp(3rem,6vw,5rem)]">
        <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] text-ink">
          Clients and brands
        </h2>
        <p className="mt-3 text-ink-muted">{resume.clients.join(" · ")}</p>
      </section>

      <section className="mt-[clamp(3rem,6vw,5rem)]">
        <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] text-ink">
          Highlights
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {resume.highlights.map((item) => (
            <li key={item.label} className="border-t border-line pt-4">
              <p className="font-medium text-ink">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-[clamp(3rem,6vw,5rem)]">
        <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] text-ink">
          Experience
        </h2>
        <ol className="mt-8 grid gap-12">
          {resume.jobs.map((job) => (
            <li
              key={`${job.company}-${job.dates}`}
              className="grid gap-3 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_auto]"
            >
              <div>
                <h3 className="text-[clamp(1.15rem,1.6vw,1.45rem)] text-ink">
                  {job.role} - {job.company} ({job.location})
                </h3>
                {job.path ? (
                  <p className="mt-1 text-sm text-ink-muted">{job.path}</p>
                ) : null}
                <ul className="mt-4 max-w-[72ch] list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-ink">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <p className="font-display text-accent lg:text-right">
                {job.dates}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-[clamp(3rem,6vw,5rem)]">
        <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] text-ink">
          Early career
        </h2>
        <p className="mt-4 max-w-[70ch] leading-relaxed text-ink">
          {resume.earlyCareer}
        </p>
      </section>

      <section className="mt-[clamp(3rem,6vw,5rem)]">
        <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] text-ink">
          Skills and tools
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {resume.skills.map((item) => (
            <li key={item.label}>
              <p className="font-medium text-ink">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
