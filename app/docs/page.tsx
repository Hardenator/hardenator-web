import type { Metadata } from "next";
import { StubPage } from "../stub";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Hardenator documentation. CLI, plugin, GitHub App, rule library, API reference.",
};

export default function DocsPage() {
  return (
    <StubPage
      eyebrow="Docs"
      title="Docs ship with the CLI."
      lead="The OSS rule library + @hardenator/cli ship the week of Apr 28, 2026. Full docs land with them at hardenator.com/docs."
      body={
        <>
          <p style={{ marginBottom: 16 }}>
            Until then, here&apos;s what you can do today:
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 10 }}>
              <strong>Read the manifesto</strong> —{" "}
              <a
                href="/manifesto"
                style={{ color: "var(--ink)", textDecoration: "underline" }}
              >
                hardenator.com/manifesto
              </a>
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong>Watch the rule library land</strong> — public Semgrep
              rules, MIT-licensed, shipping to{" "}
              <a
                href="https://github.com/Hardenator/hardenator-rules"
                style={{ color: "var(--ink)", textDecoration: "underline" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Hardenator/hardenator-rules
              </a>
              . Star it to get notified.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong>Join The Dojo</strong> — Discord community for
              rule contributions + weekly Breach Watch discussion.{" "}
              <a
                href="https://discord.gg/RVU7BjJANC"
                style={{ color: "var(--ink)", textDecoration: "underline" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                discord.gg/RVU7BjJANC
              </a>
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong>Join the waitlist</strong> so the CLI install command
              lands in your inbox the moment it&apos;s public.
            </li>
          </ul>
        </>
      }
    />
  );
}
