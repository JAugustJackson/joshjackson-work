import Link from "next/link";
import { getSite } from "@/lib/content/load";
import { liveNavItems } from "@/lib/nav";
import { ContactBlock } from "./ContactBlock";

export function SiteFooter() {
  const site = getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="box-pad mt-auto min-w-0 border-t border-line py-[clamp(1.875rem,3vw,3rem)]">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)_auto] md:items-start md:gap-10 xl:gap-16">
        <div>
          <p className="font-display text-[1.875rem] leading-tight text-ink">{site.name}</p>
          <p className="mt-3 text-sm text-ink-muted">
            © {year} {site.name}
          </p>
        </div>
        <ContactBlock size="sm" labelFont="display" />
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          {liveNavItems.map((item) => (
            <Link key={item.id} href={item.href} className="text-ink transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
