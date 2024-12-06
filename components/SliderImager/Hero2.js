/* eslint-disable @next/next/no-img-element */
import styles from "./Hero2.module.css";

const Hero2 = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>
          <span>The LYRA</span>
        </h2>
        <h3>First Generation Microarray Imaging.</h3>
        <p>Effortlessly image your microarrays with unprecedented speed.</p>
        <button className={styles.heroButton}>Pre Order</button>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero2;
