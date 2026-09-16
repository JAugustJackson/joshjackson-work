import Link from "next/link";
import { profile } from "@/content/profile";

export function ExperienceSection() {
  return (
    <section className="page-pad section-y border-t border-line">
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] text-ink">
        My experience
      </h2>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(14rem,22vw)_minmax(0,1fr)] xl:grid-cols-[minmax(16rem,26vw)_minmax(0,1fr)] xl:gap-16 2xl:grid-cols-[minmax(18rem,28vw)_minmax(0,1fr)]">
        <Link
          href="/resume"
          className="block aspect-[4/5] max-w-sm overflow-hidden border border-line bg-paper-raised lg:max-w-none"
        >
          <span className="flex h-full flex-col justify-end p-6">
            <span className="font-display text-4xl text-ink-muted/40 xl:text-6xl">
              JJ
            </span>
            <span className="mt-auto text-sm text-ink-muted">
              Photo coming soon
            </span>
          </span>
        </Link>
        <div className="max-w-[62ch] 2xl:max-w-[70ch]">
          <p className="text-[clamp(1.05rem,1.35vw,1.25rem)] leading-relaxed text-ink">
            {profile.experienceBlurb}
          </p>
          <Link
            href="/resume"
            className="mt-8 inline-flex items-center border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent"
          >
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
