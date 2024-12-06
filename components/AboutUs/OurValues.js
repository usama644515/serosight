/* eslint-disable @next/next/no-img-element */
import styles from "./OurValues.module.css";

const OurValues = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>Our Values</h2>
        <p>
          We strive to make science simple. At our core, we are a team of
          scientists who love what we do. We want to provide useful information
          so you can take better care of yourself live a healthy, longest life.
        </p>
      </div>

      <img src="/images/ourvalues.webp" alt="" className={styles.heroImage} />
    </section>
  );
};

export default OurValues;
