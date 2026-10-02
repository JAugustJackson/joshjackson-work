import "server-only";

import type { ComponentProps } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import type { Element, ElementContent, Root } from "hast";
import { toJsxRuntime, type Components } from "hast-util-to-jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { SKIP, visit } from "unist-util-visit";
import { getImageSize, getLinkCard } from "./load";

function isElement(node: ElementContent | undefined, tagName: string): node is Element {
  return node?.type === "element" && node.tagName === tagName;
}

function isBlank(node: ElementContent) {
  return node.type === "text" && !node.value.trim();
}

/**
 * `![alt](src "Caption")` alone in a paragraph becomes a figure with a figcaption.
 * Ending the src with `#right` or `#left` makes it a small figure floated beside
 * the paragraphs that follow it.
 */
function rehypeFigures() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "p" || !parent || index === undefined) return;
      const kids = node.children.filter((child) => !isBlank(child));
      const img = kids[0];
      if (kids.length !== 1 || !isElement(img, "img") || !img.properties.title) return;
      const caption = String(img.properties.title);
      delete img.properties.title;
      const [src, side] = String(img.properties.src).split("#");
      const floated = side === "right" || side === "left";
      if (floated) {
        img.properties.src = src;
        img.properties.sizes = "16rem";
      }
      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: floated ? { className: [`figure-${side}`] } : {},
        children: [
          img,
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: caption }],
          },
        ],
      };
      return SKIP;
    });
  };
}

function span(className: string, value: string): Element {
  return {
    type: "element",
    tagName: "span",
    properties: { className: [className] },
    children: [{ type: "text", value }],
  };
}

/**
 * `[card](https://...)` alone in a paragraph becomes a link card built from the
 * Open Graph data cached by `npm run link-cards`. A link title overrides the
 * fetched title.
 */
function rehypeLinkCards() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "p" || !parent || index === undefined) return;
      const kids = node.children.filter((child) => !isBlank(child));
      const link = kids[0];
      if (kids.length !== 1 || !isElement(link, "a")) return;
      const text = link.children.length === 1 ? link.children[0] : undefined;
      if (text?.type !== "text" || text.value.trim().toLowerCase() !== "card") return;

      const href = String(link.properties.href ?? "");
      const host = URL.canParse(href) ? new URL(href).hostname.replace(/^www\./, "") : href;
      const data = getLinkCard(href);
      if (!data) {
        console.warn(`No cached link card for ${href}; run \`npm run link-cards\`.`);
      }
      const title = link.properties.title ? String(link.properties.title) : (data?.title ?? host);

      const body: Element = {
        type: "element",
        tagName: "span",
        properties: { className: ["link-card-body"] },
        children: [
          span("link-card-site", data?.siteName ?? host),
          span("link-card-title", title),
          ...(data?.description ? [span("link-card-desc", data.description)] : []),
        ],
      };
      const media: Element[] = data?.image
        ? [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["link-card-media"] },
              children: [
                {
                  type: "element",
                  tagName: "img",
                  properties: { src: data.image, alt: "", sizes: "12rem" },
                  children: [],
                },
              ],
            },
          ]
        : [];

      parent.children[index] = {
        type: "element",
        tagName: "a",
        properties: { href, className: ["link-card"] },
        children: [...media, body],
      };
      return SKIP;
    });
  };
}

/** A blockquote that is a single, fully italic paragraph becomes a pull quote. */
function rehypePullQuotes() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "blockquote") return;
      const blocks = node.children.filter((child) => !isBlank(child));
      const para = blocks[0];
      if (blocks.length !== 1 || !isElement(para, "p")) return;
      const kids = para.children.filter((child) => !isBlank(child));
      const em = kids[0];
      if (kids.length !== 1 || !isElement(em, "em")) return;
      para.children = em.children;
      node.properties = { className: ["pullquote"] };
    });
  };
}

/** A blockquote whose first line is bold becomes a sidebar callout. */
function rehypeCallouts() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "blockquote") return;
      const first = node.children.find((child) => child.type === "element");
      if (!isElement(first, "p")) return;
      const lead = first.children[0];
      if (!isElement(lead, "strong")) return;

      const rest = first.children.slice(1);
      const head = rest[0];
      if (head?.type === "text") head.value = head.value.replace(/^\s+/, "");

      const replacement: ElementContent[] = [
        {
          type: "element",
          tagName: "p",
          properties: { className: ["callout-title"] },
          children: lead.children,
        },
      ];
      if (rest.some((child) => !isBlank(child))) {
        replacement.push({ ...first, children: rest });
      }
      node.children.splice(node.children.indexOf(first), 1, ...replacement);
      node.tagName = "aside";
      node.properties = { className: ["callout"] };
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeFigures)
  .use(rehypeLinkCards)
  .use(rehypePullQuotes)
  .use(rehypeCallouts);

function components(where: string): Partial<Components> {
  return {
    img: ({ src, alt, sizes = "(min-width: 1024px) 75vw, 100vw" }: ComponentProps<"img">) => {
      if (typeof src !== "string" || !src.startsWith("/")) {
        throw new Error(`Images in ${where} must use a /images/... path, got "${String(src)}"`);
      }
      const { width, height } = getImageSize(src, where);
      return (
        <Image
          src={src}
          alt={alt ?? ""}
          width={width}
          height={height}
          sizes={sizes}
        />
      );
    },
    a: ({ href = "", children, ...rest }: ComponentProps<"a">) => {
      if (href.startsWith("/")) {
        return (
          <Link href={href} {...rest}>
            {children}
          </Link>
        );
      }
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    },
    table: (props: ComponentProps<"table">) => (
      <div className="table-wrap" data-no-swipe>
        <table {...props} />
      </div>
    ),
  };
}

export function Markdown({
  source,
  where,
  className = "prose-jj",
}: {
  source: string;
  where: string;
  className?: string;
}) {
  const tree = processor.runSync(processor.parse(source)) as Root;
  return (
    <div className={className}>
      {toJsxRuntime(tree, {
        Fragment,
        jsx,
        jsxs,
        components: components(where),
      })}
    </div>
  );
}
