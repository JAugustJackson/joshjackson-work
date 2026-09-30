import type { Metadata } from "next";
import { Jost, Russo_One } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { AppShell } from "@/components/shell/AppShell";
import { getPortfolioItems, getSite } from "@/lib/content/load";
import { railScript } from "@/lib/rail";
import "./globals.css";

const russo = Russo_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-russo",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    title: {
      default: `${site.displayName} - ${site.title}`,
      template: `%s - ${site.displayName}`,
    },
    description: site.description,
    metadataBase: new URL(site.url),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const site = getSite();
  const items = getPortfolioItems().map(({ slug, navTitle }) => ({ slug, navTitle }));

  return (
    <html
      lang="en"
      className={`${russo.variable} ${jost.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: railScript }} />
      </head>
      <body className="min-h-full min-w-0 bg-canvas font-sans text-ink">
        <AppShell displayName={site.displayName} items={items} footer={<SiteFooter />}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
