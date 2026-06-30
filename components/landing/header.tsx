import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import StaggeredMenu from "@/components/staggered-menu";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Levels', ariaLabel: 'View levels', link: '/levels' },
  { label: 'Groups', ariaLabel: 'View groups', link: '/groups' },
  { label: 'Community', ariaLabel: 'View community', link: '/community' },
  { label: 'Merch', ariaLabel: 'View merch', link: '/merch' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'Instagram', link: 'https://instagram.com' }
];

export function Header() {
  return (
    <div className="section-white" style={{ borderBottom: "1px solid var(--border)", position: "relative", zIndex: 100 }}>
      <header className="container" style={{ padding: "24px 0" }}>
        <div className="space-between">
          <BrandMark />
          
          {/* <nav className="row hide-on-mobile" style={{ gap: 32, display: 'none' }}>
            <Link href="/" className="muted" style={{ fontWeight: 500 }}>Home</Link>
            <Link href="/levels" className="muted" style={{ fontWeight: 500 }}>Levels</Link>
            <Link href="/groups" className="muted" style={{ fontWeight: 500 }}>Groups</Link>
            <Link href="/community" className="muted" style={{ fontWeight: 500 }}>Community</Link>
            <Link href="/merch" className="muted" style={{ fontWeight: 500 }}>Merch</Link>
          </nav> */}
          
          <div className="row hide-on-mobile" style={{ gap: 24 }}>
            <Link href="/signin" style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.95rem" }}>
              Sign in
            </Link>
            <Link href="/signup" className="button">
              Join BIC
            </Link>
          </div>

          <div className="hide-on-desktop">
            <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              displaySocials
              displayItemNumbering={true}
              menuButtonColor="#000"
              openMenuButtonColor="#fff"
              changeMenuColorOnOpen={true}
              colors={['#111827', '#0a0e17']}
              accentColor="var(--gold)"
            />
          </div>
        </div>
      </header>
    </div>
  );
}
