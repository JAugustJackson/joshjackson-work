---
title: SREF Mining Company
navTitle: SMC.art
subtitle: A multi-tenant app for saving, mining, and retrieving MidJourney style-reference codes.
order: 6
featured: true
draft: false
card:
  image: /images/portfolio/sref-mining/cover.png
  imageAlt: The SREF Mining Company app card over a pink, painterly sample image
  summary: An SREF code management and recovery tool. This was my first end-to-end agentic build.
chips: [Product design, AI/Agentic development, UI design]
meta:
  role: Founder, designer, tech lead, DevOps, and for a while the only user
  timeline: August to December 2025, about 300 hours of late-night build time
  stack: Subframe, Supabase, Claude Code, Cursor
  team: Me, Subframe, and Claude Code
  outcome: Live public beta. Open library, free signup, paid tier dormant for now.
live:
  label: smc.art
  href: https://smc.art
---

I love SREF codes, and I kept losing them. So I built the bookmark manager I wished existed. The SREF Mining Company, or SMC, is my first complete agentic build, and I shipped it in the cracks between 10pm and midnight as a new father.

![SMC.art main library grid in production](/images/portfolio/sref-mining/01-hero.webp "The main library grid, in production")

## Where this started

I'd been collecting MidJourney style references the way most heavy users do. Bookmarked X posts, saved YouTube links, a folder of screenshots, the occasional Notion table. It failed me every single time I needed to find one again. Good curation sites and channels existed, but finding anything across all of them was a mess. Eventually the friction got loud enough that I noticed it could be something I built. So I built it, and I've used it nearly every night since.

That's the whole motivation. Necessity may be the mother of invention, but in my case it was mostly irritation.

## What an SREF actually is

If you don't live in MidJourney, here's the short version. An SREF is a style reference: a number you add to a prompt as `--sref <number>`, and it locks in a particular visual style without you having to describe it. Once you find one that hits, your prompt gets to focus on subject, framing, and composition while the style holds with near-perfect fidelity. You can also chain several together so they blend, which makes a good SREF stack its own kind of authored asset. Worth saving, in other words.

SMC saves them. Each code gets up to four example images, a title, a description, and tags. You can search by text, browse the library visually, filter by tag, and copy the prompt suffix to your clipboard. That's the loop.

## The build

About 300 hours, from August through December 2025, in the 10pm-to-midnight window most new fathers spend asleep. Subframe handled the design system, Claude Code did the heavy lifting in the codebase, Supabase sat under everything, and Cursor was my editor. Mostly for its browser-integrated agents, and honestly for its commit-message generator, which I'd pay for on its own.

Calling 300 hours "the build" is generous, though. Net out the false starts and rabbit holes, and the version that's live today is closer to 80 hours of work. The other 220 were tuition. Worth every one, but I want to be clear-eyed about which was which.

## The extension that almost got everyone banned

A coworker suggested a companion Chrome extension to capture codes faster from inside MidJourney. It was a good pitch. Anyone logged into both apps would see SMC controls added right into the MidJourney interface, and one click would save a code and its preview image straight to their library.

I'd run the original market-viability pass for SMC through Manus months earlier. A few weeks into building the extension, mostly to be safe, I went back and ran the extension idea past it too. Manus stopped me cold. Adding controls inside a user's logged-in MidJourney session would put me, and every one of my users, on the wrong side of MidJourney's terms of service. Even if the extension worked perfectly, the people I'd built it for could lose their accounts. That was the end of the extension, and about a month of work.

![Dragging an image from MidJourney into SMC's save dialog](/images/portfolio/sref-mining/02-drag-and-drop.webp "Drag from MidJourney straight into SMC's save dialog")

What we landed on instead is the workflow in the product today. Open MidJourney in one window and SMC in another, then drag any image from MidJourney onto SMC, and it starts a save with that image already attached and the code pulled cleanly from the source. Drop in up to three more images and you've got a four-image card. Friction way down, terms of service intact. Frankly, it's better than the version that would have gotten people banned.

## Three starts

I rebuilt the project from scratch twice before the third version stuck. Supabase was the only thing that survived all three.

> *Starting over isn't a dirty word anymore, at least not for me.*

![The SMC repo open in Cursor](/images/portfolio/sref-mining/03-codebase-cursor.webp "The repo open in Cursor")

I started in MagicPath and abandoned it. I spent a couple of nights in OnLook, a then-very-new Figma alternative that looked promising but that I couldn't get my head around in the time I had. I finally landed in Subframe, which is what got me from design system to shipped UI.

If I were doing it again today, I'd skip Subframe. I'd go from Sketch to production in Cursor, because that's exactly how I work now. Cursor has become my daily driver for code, and the way it translates Sketch designs and generates assets straight from the canvas is second to none. Subframe got me over the hump, but its one-way workflow, with the design system upstream, the codebase downstream, and wrapper components in the repo so syncs don't clobber your edits, was painful when the designer and the developer are the same guy. I still like Subframe. I just know where I'd start now.

Code is cheap. Knowing when to drop what isn't serving you is the more useful muscle. Starting over isn't a dirty word anymore, at least not for me.

## About the name

The mining is literal. At launch, the best way to find a new SREF was to type `--sref random` and let MidJourney pan you a number out of roughly ten billion. Most of those numbers are unremarkable. A few are gold. Finding the ones worth keeping looked an awful lot like panning a river, and it's only gotten bigger since, with three numeric sets now where there used to be two.

The free tier is the prospector's co-op. Anyone can browse, anyone can sign up, and the public library is the shared assay table.

## Where it stands

Live, free, and used by approximately three people.

The public library is open to anyone, no account needed to browse or search. You only hit a signup when you want to copy a code's suffix or save your own. From there you get a personal library (public, on the free tier), favorites from the community library, and the rest.

User count, candidly, is about three: me, my wife, and a couple of coworkers who humored me. I didn't plan the marketing side, and it shows. What I have done is leave a standing offer. Anyone visibly active in the SREF community who signs up gets a paid-tier account, free, forever, even after the paid tier switches on. I'd planned to give away fifty, and I'd take it past a hundred if there's any sign of traction and the costs stay reasonable. So far no notable SREF curator has taken me up on it. The offer's still open.

## What I took from it

SMC was proof of build, not proof of market. I learned I could do this, completely and quickly, between 10pm and midnight with an infant in the next room.

The most useful thing it taught me was the shape of my own build process: what I can get done in narrow windows, where I waste cycles, and when to throw work away. Two hours a night, with maybe seventy-five minutes of usable focus inside them, forced a discipline of good-enough decisions I'd never have arrived at with eight hours and room to wander. If I built it again in daylight, knowing what I know now, my honest guess is 40 to 50 hours.

It's a useful little app, it's the one I personally use most, and it's still the cleanest evidence I've got that one person, a design tool, an agent, and a backend can take an idea all the way to a shipped product with nobody else in the loop. I'll worry about the market when there's a reason to. The build is in the bag.
