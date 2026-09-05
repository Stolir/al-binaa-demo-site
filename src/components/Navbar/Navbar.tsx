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

function NavList({ content }: { content: Content }) {
  return (
    <ul className={styles.navLinks}>
      <Link href={""}>{content.projects}</Link>
      <Link href={""}>{content.services}</Link>
      <Link href={""}>{content.about}</Link>
      <Link href={""}>{content.contact}</Link>
      <div className={styles.language}>
        <LanguageSwitcher
          href={content.language.href}
          text={content.language.text}
        />
      </div>
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
        <NavList content={content} />
      </div>

      <div className={styles.menuToggle}>
        <BurgerMenu>
          <NavList content={content} />
        </BurgerMenu>
      </div>
    </header>
  );
}

export default Navbar;
