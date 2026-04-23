import Link from "next/link";
import { Nav } from "./nav";
import { SiteFooter } from "./site-footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            padding: "120px 0",
            textAlign: "center",
            borderBottom: "2px solid var(--ink)",
          }}
        >
          <div className="container-hd">
            <p
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--danger)",
                marginBottom: 16,
              }}
            >
              Error 404
            </p>
            <h1
              className="display"
              style={{ fontSize: "clamp(56px, 9vw, 120px)", marginBottom: 24 }}
            >
              This page isn&apos;t here.
            </h1>
            <p
              style={{
                color: "var(--fog)",
                fontSize: 18,
                maxWidth: 48 + "ch",
                margin: "0 auto 40px",
              }}
            >
              Hardenator is six weeks old and still growing. Some pages
              haven&apos;t been built yet. Here&apos;s where to go instead.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/" className="btn btn-primary">
                Home
              </Link>
              <Link href="/manifesto" className="btn">
                Read the manifesto
              </Link>
              <Link href="/#waitlist" className="btn btn-ghost">
                Join the waitlist
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
