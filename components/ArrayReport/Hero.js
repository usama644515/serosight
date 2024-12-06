/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>Array Reports</h2>
        <h3>Your unique immunity results all in one place</h3>
        <p>
          Array reports are a comprehensive way to view how you immunity levels
          are effect within a specific disease sub group.
        </p>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero;
