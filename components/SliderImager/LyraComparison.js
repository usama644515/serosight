/* eslint-disable @next/next/no-img-element */
import styles from "./LyraComparison.module.css";

export default function LyraComparison() {
  return (
    <>
    <div className={styles.header}>
        <p>Competitor Comparison</p>
        <h1>
          How does <span className={styles.highlight}>LYRA</span> compare?
        </h1>
      </div>
    <section className={styles.container}>
      
      <div className={styles.comparison}>
        <div className={styles.competitor}>
          <img
            src="/images/competitor.png" /* Replace with the actual image path */
            alt="Competitor Slight Defocus"
            className={styles.image}
          />
          <p className={styles.title}>Competitor</p>
          <p className={styles.subtitle}>Slight Defocus</p>
        </div>
        <div className={styles.vs}>
          <span>VS</span>
        </div>
        <div className={styles.lyra}>
          <img
            src="/images/lyra.png" /* Replace with the actual image path */
            alt="SeroSight LYRA Perfect Focus"
            className={styles.image}
          />
          <p className={styles.title}>SeroSight LYRA</p>
          <p className={styles.subtitle}>Perfect Focus</p>
        </div>
      </div>
      <p className={styles.footer}>Intensity Scale 0–15,000 counts</p>
    </section></>
  );
}
