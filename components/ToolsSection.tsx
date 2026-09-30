"use client";

import { useMemo, useState } from "react";
import type { Proficiency, Tool } from "@/lib/content/schemas";

function Meter({ level }: { level: Proficiency }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {([1, 2, 3] as const).map((step) => (
        <span
          key={step}
          className={`size-1.5 rounded-full ${
            step <= level ? "bg-accent" : "border border-ink-faint"
          }`}
        />
      ))}
    </span>
  );
}

export function ToolsSection({
  tools,
  groups,
  labels,
  filterable = true,
}: {
  tools: Tool[];
  groups: string[];
  labels: Record<Proficiency, string>;
  filterable?: boolean;
}) {
  const filters = useMemo(() => ["All", ...groups], [groups]);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? tools : tools.filter((tool) => tool.group === filter)),
    [filter, tools],
  );

  return (
    <div>
      {filterable ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter tools">
          {filters.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={`rounded-[4px] border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent text-[#fffefa]"
                    : "border-line-strong/60 bg-paper text-ink hover:border-accent"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      ) : null}
      <ul
        className={`grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ${
          filterable ? "mt-6" : ""
        }`}
      >
        {visible.map((tool) => {
          const isOpen = open === tool.name;
          const id = `tool-${tool.name.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <li key={tool.name} className="relative">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-describedby={isOpen ? id : undefined}
                onClick={() => setOpen(isOpen ? null : tool.name)}
                onBlur={() => setOpen(null)}
                onMouseEnter={() => setOpen(tool.name)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(tool.name)}
                className="flex w-full items-center justify-between gap-3 rounded-[4px] border border-line bg-callout px-4 py-3 text-left transition-colors hover:border-accent"
              >
                <span className="text-sm text-ink">{tool.name}</span>
                <span className="flex items-center gap-2">
                  <span className="sr-only">{labels[tool.proficiency]}</span>
                  <Meter level={tool.proficiency} />
                </span>
              </button>
              {isOpen ? (
                <div
                  id={id}
                  role="tooltip"
                  className="absolute inset-x-0 top-full z-20 mt-1 rounded-[4px] border border-line bg-paper p-3 text-sm leading-relaxed text-ink shadow-[0_8px_24px_var(--shadow)]"
                >
                  <p>{tool.use}</p>
                  <p className="mt-2 text-xs text-ink-muted">{labels[tool.proficiency]}</p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
