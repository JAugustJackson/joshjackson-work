export const profile = {
  name: "Joshua Jackson",
  title: "Senior Product Designer · Design Technologist · UX Strategy",
  location: "Middleboro, MA (Remote-ready)",
  phone: "+1 (617) 840-5044",
  phoneHref: "tel:+16178405044",
  email: "joshua.a.m.jackson@gmail.com",
  emailHref: "mailto:joshua.a.m.jackson@gmail.com",
  linkedinLabel: "linkedin.com/in/jam-jackson",
  linkedinHref: "https://www.linkedin.com/in/jam-jackson",
  intro:
    "Design technologist bridging design, product, engineering, and AI to move from idea to shipped product. I bring 30 years across brand, marketing, and product design, with experience spanning Disney, Mercer, and Universal Music Group - plus the strategy, systems thinking, and hands-on technical fluency to define the problem and build the solution.",
  experienceBlurb:
    "Thirty years across brand, marketing, and product design. I get called in for ambiguous, cross-functional problems: the ones that need someone who can frame the work, build consensus, and ship the thing. Recent stretch includes Disney, Universal Music Group, Mercer, and Halo Media, from design systems and SDUI tooling through production Framer and independent products.",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
] as const;
