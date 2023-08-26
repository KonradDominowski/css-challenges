import { Image } from "@chakra-ui/react";
import Link from "next/link";

import styles from "./Section.module.scss";

export default function Section({ title, short_description, slug, is_ready, logo_url }: Topic) {
  return (
    <Link href={slug} className={`${styles.section} ${!is_ready ? styles.disabled : ""}`}>
      <Image src={logo_url} alt={"logo"} height={200} width={200} />
      <h2>{title}</h2>
      <span>{short_description}</span>
    </Link>
  );
}
