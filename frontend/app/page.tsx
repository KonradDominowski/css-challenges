import styles from "./page.module.scss";
import Section from "./components/Section";

import sections from "./dummyData";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>
        Learn HTML and CSS <br></br>by <span>practicing</span>
      </h1>
      <p>Choose a topic you want to practice, or go ahead and do all challenges from start to finish</p>

      <div className={styles.grid}>
        {sections.map((section) => (
          <Section key={section.slug} {...section} />
        ))}
      </div>
    </main>
  );
}
