/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>IMMUNITY GUIDE</h2>
        <p>
          Our immunity guide explains our long-term and short-term health
          insight packages as well as the different illnesses and diseases we
          can test.
        </p>
      </div>
    </section>
  );
};

export default Hero;
