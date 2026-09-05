import Link from "next/link";
import styles from "./Footer.module.css";
import { Lang } from "@/lib/types";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  brand: string;
  description: string;
  quickLinksTitle: string;
  quickLinks: FooterLink[];
  corporateTitle: string;
  corporate: FooterLink[];
  hqTitle: string;
  hq: {
    addressLines: string[];
    phone: string;
    email: string;
  };
  copyright: string;
};

interface FooterProps {
  content: FooterContent;
  lang?: Lang;
}

function Footer({ content, lang = "en" }: FooterProps) {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site Footer">
      <div className={styles.mainContent}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.brandTitle}>{content.brand}</div>
          <p className={styles.brandDesc}>{content.description}</p>

          <div className={styles.socialIcons} aria-label="Company Links">
            <Link
              href="#"
              className={styles.socialIconLink}
              aria-label="Corporate Website"
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </Link>

            <Link
              href="#"
              className={styles.socialIconLink}
              aria-label="Send an email"
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </Link>

            <Link
              href="#"
              className={styles.socialIconLink}
              aria-label="Find office location"
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Quick Links Navigation */}
        <nav className={styles.column} aria-label={content.quickLinksTitle}>
          <h3 className={styles.columnTitle}>{content.quickLinksTitle}</h3>
          <ul className={styles.linkList}>
            {content.quickLinks.map((item, index) => (
              <li key={index}>
                <Link href="#" className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Corporate Navigation */}
        <nav className={styles.column} aria-label={content.corporateTitle}>
          <h3 className={styles.columnTitle}>{content.corporateTitle}</h3>
          <ul className={styles.linkList}>
            {content.corporate.map((item, index) => (
              <li key={index}>
                <Link href="#" className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* HQ Contact */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{content.hqTitle}</h3>
          <address className={styles.address}>
            {content.hq.addressLines.map((line, idx) => (
              <span key={idx}>{line}</span>
            ))}
            <span className={styles.contactDivider} />
            <Link href="#" className={styles.contactLink}>
              {content.hq.phone}
            </Link>
            <Link href="#" className={styles.contactLink}>
              {content.hq.email}
            </Link>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBarWrapper}>
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>{content.copyright}</p>

          <div className={styles.languageLinks} aria-label="Language selection">
            <Link
              href="/en"
              className={`${styles.langLink} ${lang === "en" ? styles.active : ""}`}
            >
              English
            </Link>
            <span className={styles.langDivider} aria-hidden="true">
              |
            </span>
            <Link
              href="/ar"
              className={`${styles.langLink} ${lang === "ar" ? styles.active : ""}`}
            >
              العربية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
