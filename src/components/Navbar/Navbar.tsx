import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { Lang } from "@/lib/types";
import { getDictionary } from "@/lib/utils";
import { fontsByLang } from "@/lib/fonts";

interface NavbarProps {
  content: {
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
  lang: Lang;
}

async function Navbar({ content, lang }: NavbarProps) {
  return (
    <header className={styles.header}>
      <Link href={`/${lang}`} className={styles.logoContainer}>
        <Image src={logo} alt="company logo" width={35} height={35} />
        <p>{content.logoText}</p>
      </Link>
      <div className={styles.navLinks}>
        <Link href={""}>{content.projects}</Link>
        <Link href={""}>{content.services}</Link>
        <Link href={""}>{content.about}</Link>
        <Link href={""}>{content.contact}</Link>
      </div>
      <div className={styles.language}>
        <Link href={content.language.href}>{content.language.text}</Link>
      </div>
    </header>
  );
}

export default Navbar;
