import { work } from "@/content/work";
import { WorkCard } from "./WorkCard";

export function WorkGrid({
  heading = "Selected work",
}: {
  heading?: string;
}) {
  return (
    <section className="page-pad section-y min-w-0">
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] text-ink">
        {heading}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[repeat(2,minmax(0,1fr))] md:gap-5 xl:grid-cols-[repeat(3,minmax(0,1fr))] xl:gap-6 2xl:gap-8">
        {work.map((item, i) => (
          <WorkCard key={item.slug} item={item} featured={i < 2} />
        ))}
      </div>
    </section>
  );
}
