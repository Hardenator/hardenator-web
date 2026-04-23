import Link from "next/link";

export function Nav() {
  return (
    <nav className="nav-bar">
      <div className="container-hd nav-inner">
        <Link href="/" className="logo">
          hardenator
        </Link>
        <Link href="/#waitlist" className="btn btn-primary">
          Get early access
        </Link>
      </div>
    </nav>
  );
}
