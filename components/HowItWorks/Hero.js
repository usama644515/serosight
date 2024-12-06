/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>HOW IT WORKS</h2>
        <p>
        Learn about the science and technology that makes ImmunoMap possible. 
        </p>
        <button className={styles.heroButton}>Who We Are</button>
      </div>
      <img src="/images/howitworks-hero.jpg" alt="Hero" className={styles.heroImage} />
    </section>
  );
};

export default Hero;
