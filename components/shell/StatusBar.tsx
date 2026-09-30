"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useSyncExternalStore } from "react";
import { breadcrumb, type NavPortfolioItem } from "@/lib/nav";
import { Monogram } from "./Monogram";

const TIME_ZONE = "America/New_York";
const dateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "long",
  month: "long",
  day: "numeric",
});
const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

function subscribeClock(onTick: () => void) {
  const id = window.setInterval(onTick, 30_000);
  return () => window.clearInterval(id);
}

function readClock() {
  const now = new Date();
  return `${dateFormat.format(now)} | ${timeFormat.format(now)}`;
}

function Clock() {
  const value = useSyncExternalStore(subscribeClock, readClock, () => "");
  return (
    <p className="shrink-0 whitespace-nowrap max-md:hidden" suppressHydrationWarning>
      {value}
    </p>
  );
}

export function StatusBar({
  displayName,
  items,
}: {
  displayName: string;
  items: NavPortfolioItem[];
}) {
  const pathname = usePathname();
  const crumbs = breadcrumb(pathname, items);

  return (
    <header className="flex h-[var(--status-h)] items-center justify-between gap-6 pr-[30px] text-base uppercase tracking-[-0.02em] text-ink">
      <div className="flex min-w-0 items-center gap-2.5">
        <Link href="/" aria-label={`${displayName}, home`} className="shrink-0 text-ink md:hidden">
          <Monogram />
        </Link>
        <p className="truncate">
          <span className="text-ink-faint rail-open:hidden">
            {displayName}
            <span aria-hidden="true"> | </span>
          </span>
          {crumbs.map((crumb, index) => (
            <Fragment key={crumb}>
              {index > 0 ? <span aria-hidden="true"> | </span> : null}
              {index === 0 && crumbs.length > 1 ? (
                <Link href="/portfolio" className="transition-colors hover:text-accent">
                  {crumb}
                </Link>
              ) : (
                <span>{crumb}</span>
              )}
            </Fragment>
          ))}
        </p>
      </div>
      <Clock />
    </header>
  );
}
