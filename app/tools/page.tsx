import type { Metadata } from "next";
import { ToolsSection } from "@/components/ToolsSection";
import { getPage } from "@/lib/content/load";
import { Markdown } from "@/lib/content/markdown";

export function generateMetadata(): Metadata {
  const { data } = getPage("tools");
  return { title: data.title, description: data.subtitle };
}

export default function ToolsPage() {
  const { data: page, body } = getPage("tools");

  return (
    <main id="main" className="min-w-0">
      <header className="box-pad pt-[clamp(1.875rem,4.2vw,3.75rem)]">
        <h1 className="page-title text-ink">{page.title}</h1>
        <p className="page-subtitle mt-3 text-ink">{page.subtitle}</p>
        <Markdown
          source={body}
          where="content/pages/tools.md"
          className="prose-jj prose-intro mt-[clamp(1.75rem,3vw,2.5rem)]"
        />
      </header>
      <section className="box-pad section-y" aria-label="Tool catalog">
        <ToolsSection tools={page.tools} groups={page.groups} labels={page.proficiency} />
      </section>
    </main>
  );
}
