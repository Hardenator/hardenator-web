import Link from "next/link";

const GITHUB_ORG = "Lingesh389"; // TODO: flip to "hardenator" once the org is created

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container-hd">
        <div className="footer-grid">
          <div>
            <div className="logo logo-sm">hardenator</div>
            <p className="footer-about">
              The security OS for AI-generated code. Built by a solo founder
              who audited his own vibe-coded SaaS first.
            </p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <ul>
              <li>
                <Link href="/#how">How it works</Link>
              </li>
              <li>
                <Link href="/#rules">Rule library</Link>
              </li>
              <li>
                <Link href="/#pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/docs">Docs</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Community</div>
            <ul>
              <li>
                <a
                  href={`https://github.com/${GITHUB_ORG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/RVU7BjJANC"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/hardenator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <Link href="/blog">Breach Watch</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Hardenator. Built in Kuala Lumpur.</div>
          <div className="footer-bottom-links">
            <Link href="/manifesto">Manifesto</Link>
            <Link href="/security">Security</Link>
            <Link href="/press">Press kit</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
