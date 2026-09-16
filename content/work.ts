export type WorkItem = {
  slug: string;
  title: string;
  oneLiner: string;
  chips: string[];
  liveUrl?: string;
  liveLabel?: string;
  role?: string;
  timeline?: string;
  copyStatus: "tbd";
  sections: { heading: string; body: string }[];
};

const tbd = "Copy TBD.";

export const work: WorkItem[] = [
  {
    slug: "halo-framer",
    title: "Halo on Framer",
    oneLiner:
      "Led the production build of Halo's agency site in Framer, from development through launch.",
    chips: ["Framer", "Production", "Mentorship"],
    liveUrl: "https://halopowered.com",
    liveLabel: "halopowered.com",
    role: "Senior Product Designer, production lead",
    timeline: "Halo Media, 2020-2026",
    copyStatus: "tbd",
    sections: [
      { heading: "Context", body: tbd },
      { heading: "Problem", body: tbd },
      { heading: "Decisions", body: tbd },
      { heading: "Outcome", body: tbd },
    ],
  },
  {
    slug: "silk-river",
    title: "Silk River Proposal",
    oneLiner: "A product proposal. Copy TBD.",
    chips: ["Proposal", "Product", "AI"],
    copyStatus: "tbd",
    sections: [
      { heading: "Context", body: tbd },
      { heading: "Problem", body: tbd },
      { heading: "Decisions", body: tbd },
      { heading: "Outcome", body: tbd },
    ],
  },
  {
    slug: "inner-u",
    title: "Inner.U Migration",
    oneLiner:
      "A Coglode-and-Octalysis evaluation became the design language for Inner.U's shipped funnel.",
    chips: ["Strategy", "Funnel", "Brand", "UX"],
    liveUrl: "https://inneru.coach",
    liveLabel: "inneru.coach",
    role: "Product design and strategy, mid-fi wireframes",
    timeline: "The Handel Group",
    copyStatus: "tbd",
    sections: [
      { heading: "Context", body: tbd },
      { heading: "Problem", body: tbd },
      { heading: "Decisions", body: tbd },
      { heading: "Outcome", body: tbd },
    ],
  },
  {
    slug: "redacted",
    title: "Redacted",
    oneLiner:
      "A complete physical product, storefront, and content channel shipped for $1,470 against a ~$180,000 replacement cost.",
    chips: ["Product", "Brand", "End-to-end"],
    liveUrl: "https://redacted.cx",
    liveLabel: "redacted.cx",
    role: "Creator, art director, and every other seat",
    timeline: "2024-2026",
    copyStatus: "tbd",
    sections: [
      { heading: "Context", body: tbd },
      { heading: "Problem", body: tbd },
      { heading: "Decisions", body: tbd },
      { heading: "Outcome", body: tbd },
    ],
  },
  {
    slug: "sref-mining",
    title: "SREF Mining Company",
    oneLiner:
      "A multi-tenant app for saving, mining, and retrieving MidJourney style-reference codes.",
    chips: ["Product", "Full-stack", "AI"],
    liveUrl: "https://smc.art",
    liveLabel: "smc.art",
    role: "Sole designer and builder",
    copyStatus: "tbd",
    sections: [
      { heading: "Context", body: tbd },
      { heading: "Problem", body: tbd },
      { heading: "Decisions", body: tbd },
      { heading: "Outcome", body: tbd },
    ],
  },
  {
    slug: "gligh",
    title: "Gligh",
    oneLiner:
      "A Framer plugin that puts every glyph in a Google Font one click away.",
    chips: ["Plugin", "Framer", "Typography"],
    liveUrl: "https://www.framer.com/marketplace/plugins/gligh/",
    liveLabel: "Framer Marketplace",
    role: "Sole designer and builder",
    copyStatus: "tbd",
    sections: [
      { heading: "Context", body: tbd },
      { heading: "Problem", body: tbd },
      { heading: "Decisions", body: tbd },
      { heading: "Outcome", body: tbd },
    ],
  },
];

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}
