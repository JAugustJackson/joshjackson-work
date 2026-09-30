import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="box-pad section-y min-w-0">
      <h1 className="page-title text-ink">Not found</h1>
      <p className="page-subtitle mt-3 max-w-[42ch] text-ink">That URL is not on this site.</p>
      <p className="mt-8">
        <Link href="/" className="btn-accent">
          Home
        </Link>
      </p>
    </main>
  );
}
