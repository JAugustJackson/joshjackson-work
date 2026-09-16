import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Joshua Jackson: client production, product, and independent tools.",
};

export default function WorkIndexPage() {
  return (
    <main id="main" className="min-w-0">
      <WorkGrid heading="Work" />
    </main>
  );
}
