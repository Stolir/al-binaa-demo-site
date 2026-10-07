import Link from "next/link";
import styles from "./ButtonLink.module.css";
import { Lang } from "@/lib/types";
import { localizeHref } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
  variant: Variant;
  lang?: Lang;
}

function ButtonLink({ children, href, variant, lang }: ButtonLinkProps) {
  const finalHref = lang ? localizeHref(href, lang) : href;
  return (
    <Link href={finalHref} className={`${styles.buttonLink} ${styles[variant]}`}>
      {children}
    </Link>
  );
}

export default ButtonLink;
