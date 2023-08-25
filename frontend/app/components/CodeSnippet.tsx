import React from "react";
import styles from "./CodeSnippet.module.scss";

export default function CodeSnippet({ children }: { children: string }) {
  return <span className={styles.code}>{children}</span>;
}
