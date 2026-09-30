"use client";

import { useEffect } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

export function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => {
      if (mq.matches) onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open, onOpenChange]);

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className={`fixed top-[17px] left-0 z-40 flex size-[30px] items-center justify-center text-ink transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${
          open ? "translate-x-[22px]" : ""
        }`}
      >
        <span aria-hidden="true" className="relative block h-[10px] w-[16px]">
          <span
            className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-200 motion-reduce:transition-none ${
              open ? "top-1 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute top-1 left-0 h-0.5 w-full bg-current transition-opacity duration-200 motion-reduce:transition-none ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-200 motion-reduce:transition-none ${
              open ? "top-1 -rotate-45" : "top-2"
            }`}
          />
        </span>
      </button>
      {open ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => onOpenChange(false)}
          className="fixed inset-y-0 right-0 left-[var(--mobile-rail-w)] z-30 cursor-default md:hidden"
        />
      ) : null}
    </>
  );
}
