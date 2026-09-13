import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import logo from "../../../public/icons/logo.png";
import { Lang } from "@/lib/types";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

type Content = {
  logoText: string;
  projects: string;
  services: string;
  about: string;
  contact: string;
  language: {
    text: string;
    href: string;
  };
};

interface NavbarProps {
  content: Content;
  lang: Lang;
}

interface NavListProps {
  content: Content;
  lang: Lang;
}

function NavList({ content, lang }: NavListProps) {
  return (
    <ul className={styles.navLinks}>
      <li>
        <Link href={`/${lang}/projects`}>{content.projects}</Link>
      </li>
      <li>
        <Link href={`/${lang}/services`}>{content.services}</Link>
      </li>
      <li>
        <Link href={`/${lang}/about`}>{content.about}</Link>
      </li>
      <li>
        <Link href={`/${lang}/contact`}>{content.contact}</Link>
      </li>
      <li className={styles.language}>
        <LanguageSwitcher
          href={content.language.href}
          text={content.language.text}
        />
      </li>
    </ul>
  );
}

async function Navbar({ content, lang }: NavbarProps) {
  return (
    <header className={styles.header}>
      <Link href={`/${lang}`} className={styles.logoContainer}>
        <Image src={logo} alt="company logo" width={35} height={35} />
        <p>{content.logoText}</p>
      </Link>
      <div className={styles.defaultNavContainer}>
        <NavList content={content} lang={lang} />
      </div>

      <div className={styles.menuToggle}>
        <BurgerMenu>
          <NavList content={content} lang={lang} />
        </BurgerMenu>
      </div>
    </header>
  );
}

export default Navbar;
