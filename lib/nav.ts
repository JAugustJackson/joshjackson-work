export type NavIcon = "home" | "portfolio" | "about" | "tools" | "contact" | "chat";

export type NavItem = {
  id: string;
  href: string;
  label: string;
  icon: NavIcon;
  future?: true;
};

export const navItems: NavItem[] = [
  { id: "home", href: "/", label: "Home", icon: "home" },
  { id: "portfolio", href: "/portfolio", label: "Portfolio", icon: "portfolio" },
  { id: "about", href: "/about", label: "About", icon: "about" },
  { id: "tools", href: "/tools", label: "Tools", icon: "tools" },
  { id: "contact", href: "/contact", label: "Contact", icon: "contact", future: true },
  { id: "chat", href: "/chat", label: "Chat", icon: "chat", future: true },
];

export const liveNavItems = navItems.filter((item) => !item.future);

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export type NavPortfolioItem = { slug: string; navTitle: string };

export function breadcrumb(pathname: string, items: NavPortfolioItem[]): string[] {
  const match = pathname.match(/^\/portfolio\/([^/]+)/);
  if (match) {
    const item = items.find((entry) => entry.slug === match[1]);
    return item ? ["Portfolio", item.navTitle] : ["Portfolio"];
  }
  const section = liveNavItems.find((item) => isActive(pathname, item.href));
  return [section?.label ?? "Not found"];
}
