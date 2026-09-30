import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { cache } from "react";
import { z } from "zod";
import {
  pageSchemas,
  portfolioItemSchema,
  siteSchema,
  type PageName,
  type PortfolioItemData,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export type PortfolioItem = PortfolioItemData & { slug: string; body: string };

function readMarkdown<S extends z.ZodType>(relPath: string, schema: S) {
  const file = path.join(CONTENT_DIR, relPath);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid front matter in content/${relPath}\n${z.prettifyError(result.error)}`,
    );
  }
  return { data: result.data as z.output<S>, body: content.trim() };
}

export function assertPublicFile(src: string, where: string) {
  if (!fs.existsSync(path.join(PUBLIC_DIR, src))) {
    throw new Error(`Missing file public${src}, referenced in ${where}`);
  }
}

export function getImageSize(src: string, where: string) {
  assertPublicFile(src, where);
  const size = imageSize(fs.readFileSync(path.join(PUBLIC_DIR, src)));
  if (!size.width || !size.height) {
    throw new Error(`Could not read the size of public${src}, referenced in ${where}`);
  }
  return { width: size.width, height: size.height };
}

export const getSite = cache(() => readMarkdown("site.md", siteSchema).data);

const loadPage = cache((name: PageName) =>
  readMarkdown(`pages/${name}.md`, pageSchemas[name]),
);

export function getPage<K extends PageName>(name: K) {
  return loadPage(name) as {
    data: z.output<(typeof pageSchemas)[K]>;
    body: string;
  };
}

export const getPortfolioItems = cache((): PortfolioItem[] => {
  const dir = path.join(CONTENT_DIR, "portfolio");
  const items = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const relPath = `portfolio/${file}`;
      const { data, body } = readMarkdown(relPath, portfolioItemSchema);
      assertPublicFile(data.card.image, `content/${relPath}`);
      return { ...data, slug: file.replace(/\.md$/, ""), body };
    })
    .filter((item) => SHOW_DRAFTS || !item.draft)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  const orders = new Map<number, string>();
  for (const item of items) {
    const clash = orders.get(item.order);
    if (clash) {
      throw new Error(
        `content/portfolio/${item.slug}.md and ${clash}.md both use order: ${item.order}`,
      );
    }
    orders.set(item.order, item.slug);
  }
  return items;
});

export function getPortfolioItem(slug: string) {
  return getPortfolioItems().find((item) => item.slug === slug);
}

export function getAdjacentItems(slug: string) {
  const items = getPortfolioItems();
  const index = items.findIndex((item) => item.slug === slug);
  const at = (offset: number) =>
    items[(index + offset + items.length) % items.length];
  return { prev: at(-1), next: at(1) };
}

export const getToolsCatalog = cache(() => getPage("tools").data);

export const getFeaturedTools = cache(() => {
  const { tools } = getToolsCatalog();
  return getPage("home").data.tools.featured.map((name) => {
    const tool = tools.find((entry) => entry.name === name);
    if (!tool) {
      throw new Error(
        `content/pages/home.md lists tool "${name}", which is not in content/pages/tools.md`,
      );
    }
    return tool;
  });
});
