"use client";

import { useMemo, useState } from "react";
import {
  proficiencyLabel,
  toolGroups,
  tools,
  type Proficiency,
} from "@/content/tools";

const filters = ["All", ...toolGroups] as const;
type Filter = (typeof filters)[number];

function Meter({ level }: { level: Proficiency }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {([1, 2, 3] as const).map((step) => (
        <span
          key={step}
          className={`size-1.5 ${
            step <= level ? "bg-accent" : "border border-ink-muted"
          }`}
        />
      ))}
    </span>
  );
}

export function ToolsSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      filter === "All"
        ? tools
        : tools.filter((tool) => tool.group === filter),
    [filter],
  );

  return (
    <section className="page-pad section-y border-t border-line">
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] text-ink">
        Tools
      </h2>
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter tools"
      >
        {filters.map((item) => {
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item)}
              className={`border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent text-paper"
                  : "border-line bg-paper text-ink hover:border-accent"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[repeat(3,minmax(0,1fr))] 2xl:grid-cols-[repeat(4,minmax(0,1fr))]">
        {visible.map((tool) => {
          const isOpen = open === tool.name;
          return (
            <li key={tool.name} className="relative">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-describedby={isOpen ? `tool-${tool.name}` : undefined}
                onClick={() => setOpen(isOpen ? null : tool.name)}
                onBlur={() => setOpen(null)}
                onMouseEnter={() => setOpen(tool.name)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(tool.name)}
                className="flex w-full items-center justify-between gap-3 border border-line bg-paper-raised px-4 py-3 text-left transition-colors hover:border-accent"
              >
                <span className="text-sm text-ink">{tool.name}</span>
                <span className="flex items-center gap-2">
                  <span className="sr-only">
                    {proficiencyLabel[tool.proficiency]}
                  </span>
                  <Meter level={tool.proficiency} />
                </span>
              </button>
              {isOpen ? (
                <div
                  id={`tool-${tool.name}`}
                  role="tooltip"
                  className="absolute inset-x-0 top-full z-20 mt-1 border border-line bg-paper p-3 text-sm leading-relaxed text-ink shadow-[0_8px_24px_var(--shadow)]"
                >
                  <p>{tool.use}</p>
                  <p className="mt-2 text-xs text-ink-muted">
                    {proficiencyLabel[tool.proficiency]}
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
