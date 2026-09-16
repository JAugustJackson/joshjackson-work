"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex size-9 items-center justify-center rounded-sm text-ink transition-colors hover:bg-accent-soft hover:text-accent ${className}`}
      aria-label={`Switch to ${next} mode`}
    >
      {theme === "dark" ? (
        <Sun size={18} weight="bold" />
      ) : (
        <Moon size={18} weight="bold" />
      )}
    </button>
  );
}
