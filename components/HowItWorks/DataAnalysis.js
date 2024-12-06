/* eslint-disable @next/next/no-img-element */
import styles from "./DataAnalysis.module.css";

const DataAnalysis = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>Data Analysis</h2>
        <p>
          <span className={styles.items}>
            <b>Raw Data Processing:</b> Raw data from the assays is processed
            using advanced bioinformatics tools to ensure accurate
            interpretation of the immunological responses.
          </span>{" "}
          <br /> <br /> <br />
          <span className={styles.items}>
            <b>Algorithmic Adjustments:</b> Proprietary algorithms adjust for
            any potential variances in sample quality or handling, standardizing
            results across all samples.
          </span>{" "}
          <br /> <br />
        </p>
      </div>

      <img src="/images/analysis.webp" alt="" className={styles.heroImage} />
    </section>
  );
};

export default DataAnalysis;
