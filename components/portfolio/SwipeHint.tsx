"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FaIcon } from "@/components/icons/FaIcon";
import { SWIPED_EVENT, SWIPE_QUERY } from "./SwipeNav";

const STORAGE_KEY = "swipeHintSeen";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(SWIPE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function readEligible() {
  if (!window.matchMedia(SWIPE_QUERY).matches) return false;
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {}
}

export function SwipeHint() {
  const eligible = useSyncExternalStore(subscribe, readEligible, () => false);
  const [dismissed, setDismissed] = useState(false);
  const reduce = useReducedMotion();
  const show = eligible && !dismissed;

  useEffect(() => {
    if (!show) return;
    const onSwiped = () => {
      markSeen();
      setDismissed(true);
    };
    window.addEventListener(SWIPED_EVENT, onSwiped);
    return () => {
      window.removeEventListener(SWIPED_EVENT, onSwiped);
      markSeen();
    };
  }, [show]);

  if (!show) return null;

  const dismiss = () => {
    markSeen();
    setDismissed(true);
  };

  return (
    <button
      type="button"
      onClick={dismiss}
      aria-label="Swipe left or right to move between portfolio items. Tap to dismiss."
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-8 backdrop-blur-[2px] md:hidden"
    >
      <motion.span
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-[18rem] flex-col items-center gap-4 rounded-[14px] bg-paper px-7 py-6 text-center text-ink shadow-[var(--box-shadow)]"
      >
        <motion.span
          aria-hidden="true"
          className="text-accent"
          animate={reduce ? undefined : { x: [18, -18, 18] }}
          transition={reduce ? undefined : { duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        >
          <FaIcon icon="duotone/hand-pointer" size={48} />
        </motion.span>
        <span className="text-lg leading-snug font-medium">
          Swipe left or right to move between portfolio items
        </span>
        <span className="eyebrow text-ink-muted">Tap to dismiss</span>
      </motion.span>
    </button>
  );
}
