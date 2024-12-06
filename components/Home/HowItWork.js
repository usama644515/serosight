/* eslint-disable @next/next/no-img-element */
import styles from "./HowItWork.module.css";

const HowItWork = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>HOW IT WORKS</h2>
        <p>
          ImmunoMap screens for immunity levels for X issues spanning Y product
          lines. Customers can screen monthly, quarterly, yearly, or on demand
          to track relative immunity levels. We monitor vulnerability levels to
          issues ranging from seasonal viruses to STDs.
        </p>
        <button className={styles.heroButton}>Learn More</button>
      </div>

      <img src="/images/howitwork.webp" alt="" className={styles.heroImage} />
    </section>
  );
};

export default HowItWork;
