import Link from "next/link";

export function Leaf({ className = "leaf" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#c8102e" d="M12 2l1.6 3.3 2-.9-.6 4.6 2.6-2.4.8 1.8 2.9-.5-1 3.2 1.4.8-4.7 3.9.7 1.9-4.7-.7.2 4.9h-1l.2-4.9-4.7.7.7-1.9-4.7-3.9 1.4-.8-1-3.2 2.9.5.8-1.8 2.6 2.4-.6-4.6 2 .9z" />
    </svg>
  );
}

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="rsg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff5a3c" /><stop offset="1" stopColor="#ff2e7e" /></linearGradient>
        <linearGradient id="rst" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#00b3a4" /><stop offset="1" stopColor="#6c3cff" /></linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#1b1446" />
      <path d="M9 17a11 11 0 0119-6" stroke="url(#rsg)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M30 7l-1 6-6-1.5z" fill="#ff2e7e" />
      <path d="M31 23a11 11 0 01-19 6" stroke="url(#rst)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M10 33l1-6 6 1.5z" fill="#00b3a4" />
      <circle cx="16.5" cy="20" r="3.2" fill="none" stroke="#ffb800" strokeWidth="2.2" />
      <path d="M19.7 20h6.5m-2.2 0v2.6m-2.6-2.6v1.8" stroke="#ffb800" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="VehicleHandoff home">
      <Mark />
      <span>Vehicle<b>Handoff</b><small>.ca</small></span>
      <Leaf />
    </Link>
  );
}

export function Header() {
  return (
    <header>
      <div className="wrap">
        <Logo />
        <nav>
          <Link href="/kits">Kits</Link>
          <Link href="/provinces">Provinces</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link className="cta" href="/start">Start a kit</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap grid g3">
        <div>
          <Logo />
          <p>Private-sale paperwork for Canadians, coast to coast. <Leaf /></p>
          <p className="src">A sibling of <a href="https://boathandoff.ca">BoatHandoff.ca</a>, the private boat-sale kit.</p>
          <p className="src">VehicleHandoff is not a government service and does not give legal advice. Official filings happen with your provincial registry.</p>
        </div>
        <div>
          <b>Kits</b><br />
          <Link href="/kits/used-car-truck">Used car &amp; truck</Link><br />
          <Link href="/kits/snowmobile">Snowmobile</Link><br />
          <Link href="/kits/atv-side-by-side">ATV / side-by-side</Link><br />
          <Link href="/kits/trailer">Trailer</Link><br />
          <Link href="/kits/rv-camper">RV &amp; camper</Link>
        </div>
        <div>
          <b>Learn</b><br />
          <Link href="/guides">Guides</Link><br />
          <Link href="/provinces">Province rules</Link><br />
          <Link href="/faq">FAQ</Link><br />
          <Link href="/contact">Contact</Link><br />
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link><br />
          <a href="https://boathandoff.ca">Selling a boat? BoatHandoff.ca</a>
        </div>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
