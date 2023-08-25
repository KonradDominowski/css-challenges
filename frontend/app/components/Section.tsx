import Image from "next/image";
import Link from "next/link";

import styles from "./Section.module.scss";
import { Section } from "./../dummyData";

export default function Section({
  title,
  description,
  logoAlt,
  logoSrc,
  slug,
  disabled,
}: Section) {
  return (
    <Link
      href={slug}
      className={`${styles.section} ${disabled ? styles.disabled : ""}`}
    >
      <Image src={logoSrc} alt={logoAlt} height={200} />
      <h2>{title}</h2>
      <span>{description}</span>
    </Link>
  );
}
