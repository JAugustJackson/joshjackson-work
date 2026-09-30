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
import { getImageSize } from "./load";

function isElement(node: ElementContent | undefined, tagName: string): node is Element {
  return node?.type === "element" && node.tagName === tagName;
}

function isBlank(node: ElementContent) {
  return node.type === "text" && !node.value.trim();
}

/** `![alt](src "Caption")` alone in a paragraph becomes a figure with a figcaption. */
function rehypeFigures() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "p" || !parent || index === undefined) return;
      const kids = node.children.filter((child) => !isBlank(child));
      const img = kids[0];
      if (kids.length !== 1 || !isElement(img, "img") || !img.properties.title) return;
      const caption = String(img.properties.title);
      delete img.properties.title;
      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: {},
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
  .use(rehypeCallouts);

function components(where: string): Partial<Components> {
  return {
    img: ({ src, alt }: ComponentProps<"img">) => {
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
          sizes="(min-width: 1024px) 75vw, 100vw"
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
