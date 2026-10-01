"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { FaIcon } from "@/components/icons/FaIcon";
import { isActive, liveNavItems, type NavIcon, type NavPortfolioItem } from "@/lib/nav";
import {
  RAIL_STORAGE_KEY,
  defaultRail,
  isRailState,
  type RailState,
} from "@/lib/rail";
import { Monogram } from "./Monogram";

const glyphs = {
  home: "house",
  portfolio: "briefcase",
  about: "square-info",
  tools: "screwdriver-wrench",
  contact: "address-card",
  chat: "message-lines",
} as const satisfies Record<NavIcon, string>;

const weight = (on: boolean) => (on ? "solid" : "regular");

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
      className="shell-rail fixed inset-y-0 left-0 z-20 overflow-x-hidden overflow-y-auto overscroll-contain bg-canvas"
    >
      <div className="flex h-[var(--status-h)] items-center justify-start px-5 max-md:hidden">
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
          <span className="overflow-hidden whitespace-nowrap text-[0.9375rem] uppercase tracking-[-0.02em] text-ink-faint opacity-0 transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none rail-open:opacity-100">
            {displayName}
          </span>
        </button>
      </div>

      <div className="mx-auto h-0.5 w-[41px] bg-ink/10 max-md:mt-[66px] max-md:w-[26px] md:mx-5 md:w-auto" />

      <ul className="flex flex-col items-center gap-[15px] px-2.5 pt-[25px] pb-8 md:items-stretch md:gap-[30px] md:px-5">
        {liveNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`group flex h-[50px] items-center gap-[15px] transition-colors ${
                  active ? "text-accent" : "text-ink hover:text-accent"
                }`}
              >
                <span className="flex w-[45px] shrink-0 justify-end">
                  <FaIcon icon={`${weight(active)}/${glyphs[item.icon]}`} size={30} />
                </span>
                <span className="max-lg:sr-only overflow-hidden whitespace-nowrap text-sm font-medium uppercase tracking-[0.14em] opacity-0 transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none rail-open:opacity-100">
                  {item.label}
                </span>
              </Link>
              {item.id === "portfolio" && items.length > 0 ? (
                <ul className="hidden flex-col gap-2 pb-1 rail-open:flex">
                  {items.map((entry) => {
                    const href = `/portfolio/${entry.slug}`;
                    const current = pathname === href;
                    return (
                      <li key={entry.slug}>
                        <Link
                          href={href}
                          onClick={onNavigate}
                          aria-current={current ? "page" : undefined}
                          className={`flex h-5 items-center gap-[15px] text-xs uppercase tracking-[0.14em] transition-colors ${
                            current ? "text-accent" : "text-ink hover:text-accent"
                          }`}
                        >
                          <span className="flex w-[45px] shrink-0 justify-end">
                            <FaIcon icon={`${weight(current)}/file-lines`} size={13} />
                          </span>
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
