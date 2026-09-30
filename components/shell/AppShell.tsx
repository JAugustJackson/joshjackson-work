"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState, type ReactNode } from "react";
import type { NavPortfolioItem } from "@/lib/nav";
import { MobileNav } from "./MobileNav";
import { NavRail } from "./NavRail";
import { StatusBar } from "./StatusBar";

export function AppShell({
  displayName,
  items,
  footer,
  children,
}: {
  displayName: string;
  items: NavPortfolioItem[];
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenOn(next ? pathname : null),
    [pathname],
  );
  const close = useCallback(() => setOpenOn(null), []);

  return (
    <div className="shell" data-nav={open ? "open" : "closed"}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <MobileNav open={open} onOpenChange={setOpen} />
      <NavRail displayName={displayName} items={items} onNavigate={close} />
      <div className="shell-main flex min-h-dvh min-w-0 flex-col pb-[30px]" inert={open}>
        <StatusBar displayName={displayName} items={items} />
        <div className="body-box flex min-w-0 flex-1 flex-col overflow-clip">
          {children}
          {footer}
        </div>
      </div>
    </div>
  );
}
