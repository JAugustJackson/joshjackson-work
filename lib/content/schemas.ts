import { z } from "zod";

const text = z.string().trim().min(1);
const imagePath = text.regex(/^\/images\//, "Image paths start with /images/");

const link = z.object({
  label: text,
  href: text,
});

export const siteSchema = z.object({
  name: text,
  displayName: text,
  title: text,
  description: text,
  url: z.url(),
  contact: z
    .array(
      z.object({
        label: text,
        value: text,
        href: text.optional(),
      }),
    )
    .min(1),
  email: text,
  resumePdf: link,
});

export const portfolioItemSchema = z.object({
  title: text,
  navTitle: text,
  subtitle: text,
  order: z.number().int(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  card: z.object({
    image: imagePath,
    imageAlt: text,
    summary: text,
  }),
  chips: z.array(text).max(4).default([]),
  meta: z
    .object({
      role: text.optional(),
      timeline: text.optional(),
      stack: text.optional(),
      team: text.optional(),
      outcome: text.optional(),
    })
    .default({}),
  live: link.extend({ href: z.url() }).optional(),
});

export const homePageSchema = z.object({
  title: text,
  selectedWork: z.object({ heading: text }),
  about: z.object({
    heading: text,
    image: imagePath,
    imageAlt: text,
    blurb: text,
    cta: link,
  }),
  tools: z.object({
    heading: text,
    featured: z.array(text).min(1),
    cta: link,
  }),
});

export const portfolioPageSchema = z.object({
  title: text,
  subtitle: text,
  itemsHeading: text,
  brandsHeading: text,
  brands: z.array(
    z.object({
      name: text,
      logo: imagePath,
    }),
  ),
});

export const aboutPageSchema = z.object({
  title: text,
  subtitle: text,
  clients: z.array(text),
  highlights: z.array(z.object({ label: text, body: text })),
  jobs: z.array(
    z.object({
      company: text,
      location: text,
      role: text,
      dates: text,
      path: text.optional(),
      bullets: z.array(text).min(1),
    }),
  ),
  earlyCareer: text,
  skills: z.array(z.object({ label: text, body: text })),
});

export const toolsPageSchema = z
  .object({
    title: text,
    subtitle: text,
    groups: z.array(text).min(1),
    proficiency: z.object({ 1: text, 2: text, 3: text }),
    tools: z.array(
      z.object({
        name: text,
        group: text,
        proficiency: z.union([z.literal(1), z.literal(2), z.literal(3)]),
        use: text,
      }),
    ),
  })
  .superRefine((page, ctx) => {
    page.tools.forEach((tool, index) => {
      if (!page.groups.includes(tool.group)) {
        ctx.addIssue({
          code: "custom",
          path: ["tools", index, "group"],
          message: `"${tool.group}" is not one of: ${page.groups.join(", ")}`,
        });
      }
    });
  });

export const pageSchemas = {
  home: homePageSchema,
  portfolio: portfolioPageSchema,
  about: aboutPageSchema,
  tools: toolsPageSchema,
} as const;

export type PageName = keyof typeof pageSchemas;
export type Site = z.infer<typeof siteSchema>;
export type PortfolioItemData = z.infer<typeof portfolioItemSchema>;
export type ToolsPage = z.infer<typeof toolsPageSchema>;
export type Tool = ToolsPage["tools"][number];
export type Proficiency = Tool["proficiency"];
