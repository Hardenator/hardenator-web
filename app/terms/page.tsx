import type { Metadata } from "next";
import { StubPage } from "../stub";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Hardenator terms of service and acceptable use.",
};

export default function TermsPage() {
  return (
    <StubPage
      eyebrow="Terms of Service"
      title="Plain-language terms."
      lead="Last updated 2026-04-24. These terms get the real legal polish when the paid tier launches. Until then, here's the honest version."
      body={
        <>
          <p style={{ marginBottom: 16 }}>
            <strong>What we are:</strong> Hardenator is a best-effort security
            analysis tool for AI-generated code. It catches the 100+ specific
            patterns documented in our public rule library. It is not a
            substitute for a professional penetration test, a security audit,
            or legal security review.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>What we promise:</strong> we run scans on ephemeral
            infrastructure, we don&apos;t store your source code, and we disclose
            any security incidents affecting Hardenator within 24 hours.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>What we don&apos;t promise:</strong> 100% vulnerability
            detection. No static analyzer in the world can deliver that. We
            document our false positive rate publicly every month.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Waitlist:</strong> joining the waitlist means we&apos;ll email
            you Breach Watch, product updates, and eventually the paid tier
            launch announcement. Reply &ldquo;unsubscribe&rdquo; to any email
            to stop.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Paid tier:</strong> doesn&apos;t exist yet. When it launches
            (week of May 18), a proper paid-tier agreement lands here.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Liability:</strong> Hardenator is provided &ldquo;as is&rdquo;
            without warranty. Maximum aggregate liability is the amount you&apos;ve
            paid us in the trailing 12 months (which is currently $0 for
            waitlist members).
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Governing law:</strong> Malaysia. A US Delaware entity will
            likely take over the ToS by Month 3; we&apos;ll notify in advance.
          </p>
          <p>
            Questions:{" "}
            <a
              href="mailto:hello@hardenator.com"
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              hello@hardenator.com
            </a>
            .
          </p>
        </>
      }
    />
  );
}
