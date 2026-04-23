import Link from "next/link";
import { Nav } from "./nav";
import { SiteFooter } from "./site-footer";

type StubProps = {
  eyebrow: string;
  title: string;
  lead: string;
  body: React.ReactNode;
};

/**
 * Shared shell for "coming soon" / pre-launch pages. Keeps the brand
 * system consistent and avoids exposing 404s to visitors.
 */
export function StubPage({ eyebrow, title, lead, body }: StubProps) {
  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            padding: "96px 0 64px",
            borderBottom: "2px solid var(--ink)",
            position: "relative",
          }}
        >
          <div className="hero-stripe-top" />
          <div className="container-hd" style={{ maxWidth: 720 }}>
            <span className="eyebrow">{eyebrow}</span>
            <h1
              className="display"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                marginBottom: 24,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 20,
                color: "var(--fog)",
                marginBottom: 32,
                lineHeight: 1.55,
              }}
            >
              {lead}
            </p>
            <div
              style={{
                fontSize: 17,
                color: "var(--fog)",
                lineHeight: 1.65,
              }}
            >
              {body}
            </div>
            <div style={{ marginTop: 48 }}>
              <Link href="/#waitlist" className="btn btn-primary">
                Join the waitlist →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
