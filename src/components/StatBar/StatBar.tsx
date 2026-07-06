import styles from "./StatBar.module.css";

type Stat = {
  stat: string;
  label: string;
};

type Content = Array<Stat>;

interface StatBarProps {
  content: Content;
}

function StatBar({ content }: StatBarProps) {
  return (
    <section className={styles.statBar}>
      {content.map((item, i) => (
        <article className={styles.statCard} key={i}>
          <p className={styles.accent}>{item.stat}</p>
          <p>{item.label}</p>
        </article>
      ))}
    </section>
  );
}

export default StatBar;
