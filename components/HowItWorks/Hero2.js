/* eslint-disable @next/next/no-img-element */
import styles from "./Hero2.module.css";

const Hero2 = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>HOW <span>IT</span> WORKS</h2>
        <p>
        Learn about the science and technology that makes ImmunoMap possible.
        </p>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero2;
