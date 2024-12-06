/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <img src="/images/aboutus-hero.jpg" alt="Hero" className={styles.heroImage} />
      <div className={styles.content}>
        <h2>ABOUT US</h2>
        <p>
          We combine our passion for science with a love of customer
          empowerment. We believe the more you know and the better you
          understand yourself, the healthier you will be.
        </p>
      </div>
    </section>
  );
};

export default Hero;
