import type { Metadata } from "next";
import { StubPage } from "../stub";

export const metadata: Metadata = {
  title: "Breach Watch",
  description:
    "Weekly analysis of real vibe-coded app breaches. One incident, the failure mode that caused it, and the rule that would have caught it.",
};

export default function BlogPage() {
  return (
    <StubPage
      eyebrow="Breach Watch"
      title="Breach Watch drops weekly."
      lead="One real vibe-coded breach, what went wrong, which Hardenator rule would have caught it. Issue #1 ships the week of Apr 28, analyzing the April 20 Lovable mass breach."
      body={
        <>
          <p style={{ marginBottom: 16 }}>
            Until issue #1 lands, you can read the founder essay that started
            this whole thing:
          </p>
          <p style={{ marginBottom: 24 }}>
            <em>
              &ldquo;I audited my own vibe-coded SaaS. Here&apos;s every
              security hole I found.&rdquo;
            </em>{" "}
            — published on LinkedIn + X the weekend of Apr 25.
          </p>
          <p style={{ marginBottom: 16 }}>
            Join the waitlist and each Breach Watch issue arrives in your inbox
            the morning it drops.
          </p>
        </>
      }
    />
  );
}
