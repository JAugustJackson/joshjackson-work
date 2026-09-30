"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import {
  Briefcase,
  ChatText,
  FileText,
  House,
  IdentificationCard,
  Info,
  Wrench,
  type Icon,
} from "@phosphor-icons/react";
import { isActive, liveNavItems, type NavIcon, type NavPortfolioItem } from "@/lib/nav";
import {
  RAIL_STORAGE_KEY,
  defaultRail,
  isRailState,
  type RailState,
} from "@/lib/rail";
import { Monogram } from "./Monogram";

const icons: Record<NavIcon, Icon> = {
  home: House,
  portfolio: Briefcase,
  about: Info,
  tools: Wrench,
  contact: IdentificationCard,
  chat: ChatText,
};

function subscribeRail(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-rail"],
  });
  return () => observer.disconnect();
}

function readRail(): RailState {
  const value = document.documentElement.dataset.rail;
  return isRailState(value) ? value : "expanded";
}

function readOverride(): RailState | null {
  try {
    const value = localStorage.getItem(RAIL_STORAGE_KEY);
    return isRailState(value) ? value : null;
  } catch {
    return null;
  }
}

function useRail() {
  const pathname = usePathname();
  const rail = useSyncExternalStore(subscribeRail, readRail, () => "expanded" as const);

  useEffect(() => {
    document.documentElement.dataset.rail = readOverride() ?? defaultRail(pathname);
  }, [pathname]);

  const toggle = () => {
    const next: RailState = readRail() === "expanded" ? "collapsed" : "expanded";
    document.documentElement.dataset.rail = next;
    try {
      localStorage.setItem(RAIL_STORAGE_KEY, next);
    } catch {}
  };

  return { rail, toggle };
}

export function NavRail({
  displayName,
  items,
  onNavigate,
}: {
  displayName: string;
  items: NavPortfolioItem[];
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const { rail, toggle } = useRail();
  const expanded = rail === "expanded";

  return (
    <nav
      id="site-nav"
      aria-label="Primary"
      className="shell-rail fixed inset-y-0 left-0 z-20 overflow-y-auto overscroll-contain bg-canvas"
    >
      <div className="flex h-[var(--status-h)] items-center justify-center px-5 max-md:hidden rail-open:justify-start">
        <Link
          href="/"
          onClick={onNavigate}
          aria-label={`${displayName}, home`}
          className="text-ink transition-colors hover:text-accent lg:hidden"
        >
          <Monogram />
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls="site-nav"
          aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
          className="flex items-center gap-3 text-ink transition-colors hover:text-accent max-lg:hidden"
        >
          <Monogram className="size-[45px] shrink-0" />
          <span className="hidden text-[0.9375rem] uppercase tracking-[-0.02em] text-ink-faint rail-open:block">
            {displayName}
          </span>
        </button>
      </div>

      <div className="mx-auto h-0.5 w-[41px] bg-ink max-md:mt-[66px] max-md:w-[26px] rail-open:mx-5 rail-open:w-auto" />

      <ul className="flex flex-col items-center gap-[15px] px-2.5 pt-[25px] pb-8 md:gap-[30px] rail-open:items-stretch rail-open:px-5">
        {liveNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = icons[item.icon];
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`group flex h-[50px] items-center gap-4 transition-colors ${
                  active ? "text-accent" : "text-ink hover:text-accent"
                }`}
              >
                <Icon size={30} weight={active ? "fill" : "regular"} className="shrink-0" />
                <span className="sr-only rail-open:not-sr-only rail-open:text-sm rail-open:font-medium rail-open:uppercase rail-open:tracking-[0.14em]">
                  {item.label}
                </span>
              </Link>
              {item.id === "portfolio" && items.length > 0 ? (
                <ul className="hidden flex-col gap-2 pb-1 pl-[34px] rail-open:flex">
                  {items.map((entry) => {
                    const href = `/portfolio/${entry.slug}`;
                    const current = pathname === href;
                    return (
                      <li key={entry.slug}>
                        <Link
                          href={href}
                          onClick={onNavigate}
                          aria-current={current ? "page" : undefined}
                          className={`flex items-center gap-2.5 text-xs uppercase tracking-[0.14em] transition-colors ${
                            current ? "text-accent" : "text-ink hover:text-accent"
                          }`}
                        >
                          <FileText size={14} weight={current ? "fill" : "regular"} className="shrink-0" />
                          <span className="truncate">{entry.navTitle}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
