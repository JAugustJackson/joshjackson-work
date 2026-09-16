import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page-pad section-y">
      <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-ink">
        Page not found
      </h1>
      <p className="mt-4 max-w-[42ch] text-ink-muted">
        That URL is not on this site. Head back to work or the home page.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-accent hover:underline">
          Home
        </Link>
      </p>
    </main>
  );
}
