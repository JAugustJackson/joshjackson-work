import Link from "next/link";
import { nav, profile } from "@/content/profile";
import { ContactBlock } from "./ContactBlock";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="page-pad mt-auto min-w-0 border-t border-line section-y">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)_auto] lg:items-start xl:gap-16">
        <div>
          <p className="font-display text-2xl text-ink sm:text-3xl">
            {profile.name}
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            © {year} {profile.name}
          </p>
        </div>
        <ContactBlock compact />
        <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
          <Link href="/" className="text-ink hover:text-accent">
            Home
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
