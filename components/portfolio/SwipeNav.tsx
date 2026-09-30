"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const SWIPE_QUERY = "(pointer: coarse) and (max-width: 767px)";
export const SWIPED_EVENT = "jj:swiped";

const MIN_DX = 60;
const AXIS_RATIO = 1.5;
const IGNORE = "[data-no-swipe], input, textarea, select, [contenteditable]";

export function SwipeNav({ prevHref, nextHref }: { prevHref: string; nextHref: string }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(prevHref);
    router.prefetch(nextHref);
  }, [router, prevHref, nextHref]);

  useEffect(() => {
    const mq = window.matchMedia(SWIPE_QUERY);
    const root = document.documentElement;
    const sync = () => root.classList.toggle("swipe-enabled", mq.matches);
    sync();
    mq.addEventListener("change", sync);

    let start: { x: number; y: number; id: number } | null = null;

    const onDown = (event: PointerEvent) => {
      if (!mq.matches || !event.isPrimary || event.pointerType === "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(IGNORE)) return;
      if (document.querySelector('.shell[data-nav="open"]')) return;
      start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    };

    const onUp = (event: PointerEvent) => {
      if (!start || event.pointerId !== start.id) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) < MIN_DX || Math.abs(dx) <= AXIS_RATIO * Math.abs(dy)) return;
      window.dispatchEvent(new Event(SWIPED_EVENT));
      router.push(dx < 0 ? nextHref : prevHref);
    };

    const onCancel = () => {
      start = null;
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onCancel, { passive: true });
    return () => {
      mq.removeEventListener("change", sync);
      root.classList.remove("swipe-enabled");
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [router, prevHref, nextHref]);

  return null;
}
