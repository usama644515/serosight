/* eslint-disable @next/next/no-img-element */
import styles from "./Hero2.module.css";

const Hero2 = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>About <span>US</span></h2>
        <p>
          We combine our passion for science with a love of customer
          empowerment. We believe the more you know and the better you
          understand yourself, the healthier you will be.
        </p>
        <h3>by SeroSight</h3>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero2;
