// Fetches Open Graph data for every `[card](https://...)` line in content/ and
// caches it in content/link-cards.json, with images saved under
// public/images/link-cards/. Already-cached URLs are skipped unless --refresh
// is passed. Failures only warn: a third-party site being down must never
// break a build, the card just renders without its preview.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const CACHE_FILE = path.join(CONTENT_DIR, "link-cards.json");
const IMAGE_DIR = path.join(ROOT, "public/images/link-cards");
const CARD_LINE = /^\[card\]\((https?:\/\/[^\s)]+)(?:\s+"[^"]*")?\)\s*$/gim;
const IMAGE_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};
const HEADERS = {
  "user-agent": "Mozilla/5.0 (compatible; joshjackson.work link cards)",
  accept: "text/html,application/xhtml+xml",
};

const refresh = process.argv.includes("--refresh");

function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function readMeta(html) {
  const meta = {};
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const key = /\b(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    const content = /\bcontent\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1];
    if (key && content && !(key.toLowerCase() in meta)) {
      meta[key.toLowerCase()] = decode(content);
    }
  }
  const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1];
  const icon = /<link\b[^>]*rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*>/i
    .exec(html)?.[0]
    .match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
  return { meta, title: title && decode(title), icon };
}

function slugFor(url) {
  const { hostname, pathname } = new URL(url);
  return `${hostname}${pathname}`
    .replace(/^www\./, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function saveImage(src, slug) {
  const res = await fetch(src, { headers: HEADERS, signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`image ${res.status}`);
  const type = res.headers.get("content-type")?.split(";")[0].trim();
  const ext = IMAGE_TYPES[type];
  if (!ext) throw new Error(`unsupported image type ${type}`);
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  const file = `${slug}.${ext}`;
  fs.writeFileSync(path.join(IMAGE_DIR, file), Buffer.from(await res.arrayBuffer()));
  return `/images/link-cards/${file}`;
}

async function fetchCard(url) {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`page ${res.status}`);
  const { meta, title, icon } = readMeta(await res.text());
  const host = new URL(url).hostname.replace(/^www\./, "");
  const card = {
    title: meta["og:title"] || meta["twitter:title"] || title || host,
    description: meta["og:description"] || meta["twitter:description"] || meta.description || "",
    siteName: meta["og:site_name"] || host,
  };
  const imageSrc = meta["og:image"] || meta["twitter:image"] || icon;
  if (imageSrc) {
    try {
      card.image = await saveImage(new URL(imageSrc, res.url).href, slugFor(url));
    } catch (error) {
      console.warn(`link-cards: no image for ${url} (${error.message})`);
    }
  }
  return card;
}

const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")) : {};
const urls = new Set(
  markdownFiles(CONTENT_DIR).flatMap((file) =>
    [...fs.readFileSync(file, "utf8").matchAll(CARD_LINE)].map((match) => match[1]),
  ),
);

let changed = false;
for (const url of urls) {
  if (cache[url] && !refresh) continue;
  try {
    cache[url] = await fetchCard(url);
    changed = true;
    console.log(`link-cards: cached ${url}`);
  } catch (error) {
    console.warn(`link-cards: could not fetch ${url} (${error.message})`);
  }
}

if (changed) {
  const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(CACHE_FILE, `${JSON.stringify(sorted, null, 2)}\n`);
}
