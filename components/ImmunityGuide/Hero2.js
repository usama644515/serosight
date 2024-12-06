/* eslint-disable @next/next/no-img-element */
import styles from "./Hero2.module.css";

const Hero2 = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>
          IMMUNITY <span>GUIDE</span>
        </h2>
        <p>
          Our immunity guide explains our <span>long-term</span> and <span>short-term</span> health
          insight <span>packages</span> as well as the different illnesses and diseases we
          can test.
        </p>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero2;
