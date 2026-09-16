import { profile } from "@/content/profile";
import { ContactBlock } from "./ContactBlock";
import { TypeOnName } from "./TypeOnName";

export function Hero() {
  return (
    <section className="page-pad w-full min-w-0 pt-[clamp(0.5rem,2vw,1.25rem)] pb-[clamp(2.5rem,6vw,5rem)]">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 xl:gap-16">
        <div className="min-w-0">
          <TypeOnName />
        </div>
        <div className="min-w-0 border-t border-accent pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 xl:pl-12">
          <p className="mb-4 max-w-full text-[0.95rem] break-words text-ink lg:max-w-[22rem] xl:max-w-[26rem]">
            {profile.title}
          </p>
          <ContactBlock />
        </div>
      </div>
      <p className="mt-[clamp(1.75rem,4vw,3rem)] max-w-[68ch] text-[clamp(1.05rem,1.4vw,1.35rem)] leading-relaxed break-words text-ink 2xl:max-w-[78ch]">
        {profile.intro}
      </p>
    </section>
  );
}
