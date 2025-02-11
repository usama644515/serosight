/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>SHOP IMMUNOMAP</h2>
        <p>
          Take charge of your immunity with our blood testing technology and diagnostics. Scan for allergens, viruses, bacteria, proteins, and parasites. Find the right test for you.
        </p>
        <button className={styles.heroButton}>Immunity Guide</button>
      </div>
      <img src="/images/shop-hero.jpg" alt="Hero" className={styles.heroImage} />
    </section>
  );
};

export default Hero;
