# Content authoring guide

Every page on joshjackson.work is built from the Markdown files in this folder. Edit a file, commit, and Vercel rebuilds the site. There is no admin UI.

Each file has YAML front matter (between the `---` lines) for structured data, and a Markdown body for prose. Front matter is checked against a schema in `lib/content/schemas.ts` at build time. If a field is missing or the wrong type, `npm run build` stops and prints the file and field that failed, so a typo can't ship a broken page.

```text
content/
  site.md            name, title, contact details, resume PDF
  pages/
    home.md          Home: hero intro (body), section headings, about teaser, featured tools
    portfolio.md     Portfolio index: title, subtitle, NDA intro (body), brand logos
    about.md         About: profile (body), highlights, jobs, early career, skills
    tools.md         Tools: blurb (body), groups, proficiency labels, full tool catalog
  portfolio/
    <slug>.md        one file per portfolio item; the filename is the URL
```

## Portfolio items

Add a file to `content/portfolio/` to add an item, edit it to change it, or delete it to remove it. Home, the Portfolio page, the nav rail, and mobile swipe order all update together.

The filename becomes the URL: `content/portfolio/halo-framer.md` is served at `/portfolio/halo-framer`.

```yaml
title: Halo on Framer          # page title and card title
navTitle: Halo on Framer       # short label for the nav rail and breadcrumb
subtitle: Improving the Halo web presence by reducing internal friction.
order: 1                       # sort order everywhere; each item needs a unique number
featured: true                 # show in Home "Selected work"
draft: false                   # true hides the item from production builds (still visible in `npm run dev`)
card:
  image: /images/portfolio/halo-framer/cover.png
  imageAlt: Describe the image for screen readers
  summary: One or two sentences shown on the cards.
chips: [Product direction, Management, Tooling]   # up to 4
meta:                          # the details table; every field is optional
  role: Design Lead, build, platform champion
  timeline: ~2 months of part time
  stack: Framer (enterprise), Rive
  team: Two designers, part-time
  outcome: Shipped
live:                          # optional link to the live work
  label: halopowered.com
  href: https://halopowered.com
```

### The body

- **The first paragraph is the lede.** It sits under the subtitle, above the details table.
- Use `##` for section headings and `###` for subheadings.
- Standard Markdown works: links, lists, bold, italics, and tables.

### Figures

An image on its own line with a title (the quoted text) becomes a bordered figure with a caption:

```markdown
![Alt text for screen readers](/images/portfolio/halo-framer/01-home.png "Caption shown under the image")
```

End the path with `#right` (or `#left`) for a small captioned figure that floats beside the text. Put it on the line before the paragraph it should sit next to. On phones it stacks, centered, above that paragraph.

```markdown
![Alt text](/images/portfolio/gligh/04-logo.webp#right "Caption shown under the image")
```

Without a title it renders as a plain image. Width and height are read from the file, so you never type dimensions. A missing image file fails the build.

### Sidebar callouts

A blockquote whose first line is bold becomes a callout with a red rule:

```markdown
> **Sidebar — on the name**
> The font picked up its working name...
```

A blockquote that is one fully italic line becomes a large pull quote:

```markdown
> *Starting over isn't a dirty word anymore, at least not for me.*
```

Any other blockquote stays a normal quote.

### Link cards

A link whose text is `card`, on its own line, becomes a preview card (image on the left, site, title, and description on the right) that opens in a new tab:

```markdown
[card](https://www.coglode.com)
[card](https://www.coglode.com "Override the fetched title")
```

The preview comes from the page's Open Graph tags. `npm run dev` and `npm run build` fetch any new card URLs first, saving the data to `content/link-cards.json` and the image to `public/images/link-cards/`. Commit both. Already-cached URLs are never refetched; run `npm run link-cards -- --refresh` to update them. If a site can't be reached, the card still renders with just its domain, and the build doesn't fail.

### Notes to yourself

HTML comments (`<!-- like this -->`) are never rendered, which makes them useful for marking where a figure still needs to go.

## Images

Put images under `public/images/` and reference them from `/images/...`:

```text
public/images/
  joshua-jackson.png                 About photo on Home
  portfolio/<slug>/cover.png         card image (about 1.9:1, 1272px wide or more)
  portfolio/<slug>/01-*.png          figures, numbered in the order they appear
  brands/*.svg                       Portfolio logo wall (single-color logos, inverted in dark mode)
  link-cards/*                       link card previews, written by `npm run link-cards`
```

## Static pages

Each file in `pages/` has its own schema. Lists, headings, and image paths live in front matter. Longer prose lives in the body.

- **Home:** `tools.featured` lists tool names exactly as they appear in `tools.md`. A name that isn't in the catalog fails the build.
- **Tools:** every tool's `group` must be one of the `groups`. `proficiency` is 1, 2, or 3, labeled by the `proficiency` map.
- **About:** jobs render in the order listed. `path` (the promotion line) is optional.
