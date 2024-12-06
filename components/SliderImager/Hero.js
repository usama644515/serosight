/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>The LYRA</h2>
        <p>
          First Generation Microarray Imaging. Effortlessly image your
          microarrays with unprecedented speed.
        </p>
        <button className={styles.heroButton}>Pre-Order</button>
      </div>
      <img
        src="/images/shop-hero.jpg"
        alt="Hero"
        className={styles.heroImage}
      />
    </section>
  );
};

export default Hero;
