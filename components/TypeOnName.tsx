"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const PRE_MS = 1500;
const CHAR_MS = 70;
const POST_MS = 1200;
const BLINK_MS = 530;
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function TypeOnName({ name }: { name: string }) {
  const skip = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"pre" | "type" | "post" | "done">("pre");
  const [blinkOn, setBlinkOn] = useState(true);

  useEffect(() => {
    if (skip) return;

    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    let cancelled = false;

    const run = async () => {
      await wait(PRE_MS);
      if (cancelled) return;
      setPhase("type");

      for (let i = 1; i <= name.length; i += 1) {
        await wait(CHAR_MS);
        if (cancelled) return;
        setShown(i);
      }

      setPhase("post");
      await wait(POST_MS);
      if (cancelled) return;
      setPhase("done");
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [skip, name]);

  useEffect(() => {
    if (skip || phase === "done") return;
    const id = window.setInterval(() => {
      setBlinkOn((on) => !on);
    }, BLINK_MS);
    return () => window.clearInterval(id);
  }, [skip, phase]);

  const display = skip ? name : name.slice(0, shown);
  const showCursor = !skip && phase !== "done";
  const cursorOn =
    phase === "type" || ((phase === "pre" || phase === "post") && blinkOn);

  return (
    <h1 className="page-title w-full text-ink">
      <span className="sr-only">{name}</span>
      <span aria-hidden="true" className="relative block">
        <span className="invisible">{name}</span>
        <span className="absolute inset-0">
          {display}
          {showCursor ? (
            <span
              className={`ml-[0.06em] inline-block h-[0.78em] w-[0.42em] translate-y-[0.04em] bg-accent align-baseline transition-opacity duration-150 ${
                cursorOn ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null}
        </span>
      </span>
    </h1>
  );
}
