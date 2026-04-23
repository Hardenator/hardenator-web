import type { Metadata } from "next";
import { Nav } from "../nav";
import { SiteFooter } from "../site-footer";

export const metadata: Metadata = {
  title: "The Hardenator Manifesto",
  description:
    "We build at the edge of two truths. The AI writes code now. Consequences are still human.",
};

export default function ManifestoPage() {
  return (
    <>
      <Nav />
      <main>
        <article
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "120px 0 160px",
            borderBottom: "2px solid var(--ink)",
          }}
        >
          <div
            className="container-hd"
            style={{ maxWidth: 720, fontSize: 18, lineHeight: 1.65 }}
          >
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--danger)",
                marginBottom: 16,
              }}
            >
              The Hardenator Manifesto
            </p>
            <h1
              className="display"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                marginBottom: 48,
                color: "var(--paper)",
              }}
            >
              We build at the edge of two truths.
            </h1>

            <p style={{ marginBottom: 20 }}>
              The first truth is that AI writes code now. Millions of founders ship
              software they did not write, architected in a weekend by a model
              trained on the entire internet. The AI is brilliant at patterns.
              The AI is terrible at consequences.
            </p>
            <p style={{ marginBottom: 20 }}>
              The second truth is that consequences are human. Every breach is a
              user&apos;s data. Every leak is a person&apos;s address, health record, ID
              number, or financial ruin. The AI does not see this. We do.
            </p>
            <p style={{ marginBottom: 48 }}>
              Hardenator exists to sit in the space between the code the AI writes
              and the user whose life it touches. We are the hand that checks the
              door before the house is occupied.
            </p>

            <h2
              className="display"
              style={{
                fontSize: 28,
                marginBottom: 20,
                color: "var(--hazard)",
              }}
            >
              What we believe
            </h2>
            <ol
              style={{
                paddingLeft: 20,
                marginBottom: 48,
                color: "var(--paper)",
              }}
            >
              <li style={{ marginBottom: 14 }}>
                Speed should not cost safety. Vibe coding is a gift. We refuse
                to let it become a threat.
              </li>
              <li style={{ marginBottom: 14 }}>
                Security should be invisible until it matters. No one should
                have to learn AppSec to ship a product. We do that part.
              </li>
              <li style={{ marginBottom: 14 }}>
                Every breach we prevent is a user we didn&apos;t betray. That is our
                success metric. Not MRR. Not stars. Betrayals avoided.
              </li>
              <li style={{ marginBottom: 14 }}>
                Our rule library belongs to everyone. It is open, free, and
                always will be. Competitors can fork it. Researchers can
                contribute to it. Regulators can audit it. We would not want it
                any other way.
              </li>
              <li style={{ marginBottom: 14 }}>
                We will never scan without permission. The trust is the product.
                We treat it that way.
              </li>
              <li style={{ marginBottom: 14 }}>
                We will never store your code. Our scanners run on ephemeral
                infrastructure. Clone, scan, delete. Our databases hold findings
                — never your source.
              </li>
              <li style={{ marginBottom: 14 }}>
                We will publish our own breaches. When we get hit, you will know
                the same day. That is the deal.
              </li>
              <li style={{ marginBottom: 14 }}>
                The founder uses this tool on his own product. His audit is
                public. His findings are public. His fixes are public. If we
                are not good enough for him, we are not good enough for you.
              </li>
              <li style={{ marginBottom: 14 }}>
                If you ship something we missed, we will add a rule so nobody
                ever ships it again. Every vulnerability in production is a
                gift to the community if we respond to it correctly.
              </li>
              <li style={{ marginBottom: 14 }}>
                We will not grow at the cost of the mission. When pressure to
                add features conflicts with the mission, the mission wins.
              </li>
            </ol>

            <h2
              className="display"
              style={{
                fontSize: 28,
                marginBottom: 20,
                color: "var(--hazard)",
              }}
            >
              What you get from us
            </h2>
            <p style={{ marginBottom: 20 }}>
              An engineer&apos;s tool, built by an engineer, priced for an engineer.
            </p>
            <p style={{ marginBottom: 20 }}>
              An open rule library that works with or without our product.
            </p>
            <p style={{ marginBottom: 20 }}>
              A set of integrations to every platform the AI writes on — not
              just the one we got paid by.
            </p>
            <p style={{ marginBottom: 20 }}>
              A quarterly report on the state of AI-written code security, free
              and open.
            </p>
            <p style={{ marginBottom: 48 }}>
              A community where the best rule in the world came from a Discord
              DM at 2 AM.
            </p>

            <h2
              className="display"
              style={{
                fontSize: 28,
                marginBottom: 20,
                color: "var(--hazard)",
              }}
            >
              What we ask from you
            </h2>
            <p style={{ marginBottom: 20 }}>
              Trust us with a read-only scan of your repo. See what we find.
              Decide if we earned the trust.
            </p>
            <p style={{ marginBottom: 20 }}>
              Tell us when we&apos;re wrong. Our false positives hurt you — they
              hurt us more. Every piece of feedback makes the next scan better.
            </p>
            <p style={{ marginBottom: 48 }}>
              Help the community. If you find a pattern we don&apos;t catch, open a
              PR to the rule library. Your name in our CONTRIBUTORS.md is a
              better CV line than most bootcamps.
            </p>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid var(--whisper)",
                margin: "48px 0 32px",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 13,
                color: "var(--whisper)",
              }}
            >
              — Lingesh, founder. Kuala Lumpur, April 2026.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
