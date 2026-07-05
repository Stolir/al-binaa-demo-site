import Link from "next/link";
import styles from "./ButtonLink.module.css";

type Variant = "primary" | "secondary";

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
  variant: Variant;
}

function ButtonLink({ children, href, variant }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${styles.buttonLink} ${styles[variant]}`}>
      {children}
    </Link>
  );
}

export default ButtonLink;
