/* eslint-disable @next/next/no-img-element */
import styles from "./Hero2.module.css";

const Hero2 = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>SHOP <br /><span>IMMUNOMAP</span></h2>
        <p>
        Take charge of your immunity with our  at home blood testing kits.
        </p>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero2;
