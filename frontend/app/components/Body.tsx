"use client";

import Providers from "../providers/providers";
import NavBar from "./../components/NavBar";
import Section from "./Section";
import styles from "./Body.module.scss";

export default function Body({ topics }: { topics: Topic[] }) {
  return (
    <main className={styles.main}>
      <h1>
        Learn HTML and CSS <br></br>by <span>practicing</span>
      </h1>
      <p>Choose a topic you want to practice, or go ahead and do all challenges from start to finish</p>

      <div className={styles.grid}>
        {topics.map((topic) => (
          <Section key={topic.slug} {...topic} />
        ))}
      </div>
    </main>
  );
}
