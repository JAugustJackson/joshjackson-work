"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="page-pad flex w-full min-w-0 items-center justify-between gap-3 pt-[clamp(1rem,2.5vw,1.75rem)] pb-3">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      {isHome ? (
        <span aria-hidden="true" />
      ) : (
        <Link
          href="/"
          className="font-display text-[clamp(1.15rem,2vw,1.6rem)] text-ink transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>
      )}
      <nav className="flex shrink-0 items-center gap-1 sm:gap-2" aria-label="Primary">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2 py-2 text-sm sm:px-3 transition-colors ${
                active
                  ? "text-accent"
                  : "text-ink hover:text-accent"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
