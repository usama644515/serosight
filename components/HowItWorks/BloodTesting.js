/* eslint-disable @next/next/no-img-element */
import styles from "./BloodTesting.module.css";

const BloodTesting = () => {
  return (
    <section className={styles.hero}>
      <img
        src="/images/bloodtesting.webp"
        alt=""
        className={styles.heroImage}
      />
      <div className={styles.content}>
        <h2>Blood Testing</h2>
        <p>
          <span className={styles.items}>
            <b>Sample Preparation:</b> Samples are reconstituted and prepared
            for analysis, ensuring minimal handling to preserve quality.
          </span>{" "}
          <br /> <br /> <br />
          <span className={styles.items}>
            <b>PepSeq-Immunome:</b> High-resolution analysis using DNA-barcoded
            peptides to identify and quantify antibody responses to hundreds of
            thousands of antigenic targets.
          </span>{" "}
          <br /> <br /> <br />
          <span className={styles.items}>
            <b>Protein Microarray-Immunome:</b> High-quality protein targets are
            used to analyze immunological profiles, focusing on 40-60 reactive
            proteins on a mini test pad or up to 250 on a larger pad.
          </span>{" "}
          <br /> <br />
          <span className={styles.items}>
            We strive to make science simple. At our core, we are a team of
            scientists who love what we do. We want to provide useful
            information so you can take better care of yourself live a healthy,
            longest life.
          </span>
        </p>
      </div>
    </section>
  );
};

export default BloodTesting;
