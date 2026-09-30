---
title: Halo on Framer
navTitle: Halo on Framer
subtitle: Improving the Halo web presence by reducing internal friction.
order: 1
featured: true
draft: false
card:
  image: /images/portfolio/halo-framer/cover.png
  imageAlt: Halo logo on a dark field with orange and red worms
  summary: An agency marketing site, shipped in two months on Framer with a Rive scroll-animation system.
chips: [Product direction, Management, Tooling]
meta:
  role: Design Lead, build, platform champion
  timeline: ~2 months of part time
  stack: Framer (enterprise), Rive, custom code overrides, and components, Glyphs 3, Figma for Approved Design
  team: Two designers, part-time — direct partnership with Framer
  outcome: Shipped. Complete, live, Keys for content handed to marketing team
live:
  label: halopowered.com
  href: https://halopowered.com
---

Halo did most of its business through connections with existing clients, word of mouth essentially, and little need for any online marketing surface area, until they did. And always wanting to show their best, the effort to build the website was always fraught with asset sharing complexities. Putting top talent in design or development on the company website was always difficult. That’s when I recommended Framer.

![Halo website live homepage](/images/portfolio/halo-framer/01-home.png "Halo website live homepage")

## Where this started

Halo, like a lot of agencies, had a marketing site that had been waiting in line behind client work for years — what I’d taken to calling the cobbler’s flipflop.

The site had been queued up for a refresh on and off for the better part of a decade. Client work had always come first, which is the call most agencies make and the right one. By the time I stepped in, the site had been running as a single-page placeholder for a while, and another design cycle was forming behind it. None of which is unusual — it’s the situation at most agencies that protect margin by pouring everything into the work that pays. The only question was whether this round would be the one that actually shipped.

## The conversation that mattered

An earlier conversation about using Framer on a different project hadn’t landed. Following up directly turned it into a different kind of yes.

I’d been making the case for Framer and Webflow as production platforms inside the agency for a while — faster builds, tighter alignment between design intent and shipped result, lower delivery cost. The case hadn’t yet found the right project to land on. After one of those conversations didn’t go the way I’d hoped, I followed up with the leader who’d made the call to walk through the full thinking — the research, the partner outreach, the margin math.

The conversation went somewhere I hadn’t expected: not “let’s try this on the next client,” but “let’s try it on our own site” — as a way to learn the platform internally before offering it externally. One reframe — from unfamiliar stack on a client engagement to internal R&D where the stakes are ours — and the experiment had a home.

That reframe is the whole story, structurally. Everything below is the receipt.

## The team & the partnership

I pulled together a small group of designers who wanted to learn Framer, opened a direct line with Framer’s partnerships team, and secured a free enterprise license for the agency.

The group was self-selected — designers curious about owning more of the build, not just the comps. Through Framer’s partnerships team I worked out an enterprise license for the agency to use without limit, so internal cost couldn’t become a wedge against the experiment. From there we were a real production team, not a side project.

## The build

The design was ambitious enough that the original engineering scope had been a concern. Two designers built it part-time, in about two months.

The site had been designed at a level of detail — custom microinteractions, layered animations, sweat-the-pixel typography — that was genuinely involved for the available engineering bandwidth. We built it as designed, no simplifying compromises, using Framer’s component model, code overrides where the platform fell short, and a Rive integration for the animated centerpieces.

The other half of “we” was Linna Liu — a junior designer I’d argued to bring onto the team a year earlier from an unconventional path inside the agency, against the prevailing preference for hiring only experienced designers. She’d come into design from a technical background, and she turned out to be the obvious fit for Framer: designer’s instincts, technical curiosity, and the kind of comfort with bending software to fit a need that this project demanded at every layer. About two months of part-time work, between the two of us.

## The ‘worms’

![Rive editor showing the worm artboard with its Blend state machine and the Percent input](/images/portfolio/halo-framer/02-rive-worm.png "Rive editor — the worm artboard with its Blend state machine and the Percent input.")

The brief called for organic “worms” that animate as the user scrolls — and led me to my first vibe-coded production component.

The design team called them worms — long, organic, painted ribbons that needed to draw on and off as you scrolled. We tried several approaches, including Framer’s then-new vector animation tools (which is essentially production-design work in Framer with some code stitching). We landed on Rive — but the default Rive import plugin didn’t expose Inputs, and Inputs were exactly what we needed to pipe scroll progress into the artboard.

So I built the import component myself, from scratch, in ChatGPT. Copy, paste, revise, copy, paste, revise — my first vibe-coded production code, on a live site. The result: a custom Rive component exposing a Percent input that blends between a start and end state of the artboard’s state machine. Scroll position maps to percentage, percentage drives the blend, and the worm gets painted on or off the screen as the page moves. Worth noting: the Rive Inputs API we built against has since been deprecated in favor of their Data Binding tools. The component held up through launch.

## The typography rabbit hole

To make the design team’s Figma type pairings work in Framer — and keep them editable by content managers — I bought Glyphs 3 out of pocket and rebuilt the display face.

<!-- Figure to add: Glyphs 3 — the full glyph grid for the display face. -->

The headline copy paired Inter with a display face the design team had been setting manually in Figma. In Framer, with content managers needing to edit live copy, the pairing had to behave — matching baseline, matching scale, matching weight — so a marketer could swap in new headlines without the type relationship falling apart.

So I picked up Glyphs 3. I’d wanted an excuse to use it for over a decade. I remapped baseline and scale across the full glyph set so the display face would sit cleanly against Inter, then wired it in as the bold variant. The design team, watching me work, asked if I’d swap the lowercase i and j for their first alternates. I did, by hand. Then I rebalanced common letter-pair kerning across the whole face to suit how the production headlines actually fell on the page.

<!-- Figure to add: Glyphs 3 — the lowercase “i” with its alternate. -->

My early-career typesetting paid back the Glyphs 3 learning curve. I’d expected it to kill me; it didn’t. I love that software.

> **Sidebar — on the name**
> The font picked up its working name — FunkierBanana — through a series of cache-busting renames while we tested it in Framer. The original moniker was McHalo, but every retest required a fresh export name to fight Framer’s font cache, and after enough rounds I was just typing increasingly silly things to keep moving. By the time it landed, it had already been uploaded to the design team’s account-level Figma library under its accidental name, so we let it stay — at least devs and designers would be referencing the same file going forward.

## Outcome

A site that had been waiting years to ship, shipped — and started bringing qualified leads in on its own.

Halo launched its marketing site on Framer with a Rive-driven animation system and a custom-tuned display face. Before going live, we handed the keys to marketing and sales — content editing, page composition, ongoing additions all in their hands. With no paid push and only the SEO footprint the new site brought with it, the contact form went from effectively zero to a steady weekly drip of qualified inbound. Technically an infinite increase. The absolute number is modest; the pattern shift is the point.

## What this was actually about

The platform wasn’t the win. The win was a clean proof point — and that the proof point shipped.

I’d been making the case for design-led production platforms inside the agency for years. The argument wasn’t what changed minds. The shipped site was. The lesson I’d carry forward: stop arguing the platform, find the project where the experiment is welcome, and let the artifact do the rest.

I’ve since moved on from Halo, but the path is there — and I’m told the team has since shipped their first client Framer site for Chef’s Table. Glad to see it getting walked.
