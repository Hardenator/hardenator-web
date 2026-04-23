import type { Metadata } from "next";
import { StubPage } from "../stub";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Hardenator handles your code, our own security posture, the public self-audit, and the bug bounty.",
};

export default function SecurityPage() {
  return (
    <StubPage
      eyebrow="Security"
      title="We dogfood in public."
      lead="Every scan Hardenator runs on customer code runs on ephemeral infrastructure — clone, scan, delete, all within 5 minutes. We never store your source."
      body={
        <>
          <p style={{ marginBottom: 16 }}>
            <strong>Our posture:</strong>
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
            <li style={{ marginBottom: 10 }}>
              Read-only GitHub App by default. Write access is opt-in per repo
              (required only if you want auto-fix PRs).
            </li>
            <li style={{ marginBottom: 10 }}>
              Scans run in isolated containers. Your code is cloned, scanned,
              findings are stored, code is deleted. Retention: &lt; 5 minutes
              per scan.
            </li>
            <li style={{ marginBottom: 10 }}>
              API keys and secrets are never logged. Not even truncated. Not
              even in error paths.
            </li>
            <li style={{ marginBottom: 10 }}>
              Every admin action is audit-logged.
            </li>
            <li style={{ marginBottom: 10 }}>
              If we ever get breached, we disclose publicly the same day.
            </li>
          </ul>

          <p style={{ marginBottom: 16 }}>
            <strong>Coming soon on this page:</strong>
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
            <li style={{ marginBottom: 10 }}>
              <strong>Monthly self-audit report</strong> — Hardenator scanned
              by Hardenator. Every finding, every fix, public.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong>Public bug bounty</strong> — $500–$2,500 rewards via
              HackerOne. Launching Week 2.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong>SOC 2 Type I report</strong> — targeting Month 6.
            </li>
          </ul>

          <p>
            Found something that looks off?{" "}
            <a
              href="mailto:security@hardenator.com"
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              security@hardenator.com
            </a>
            . We respond within 24 hours.
          </p>
        </>
      }
    />
  );
}
