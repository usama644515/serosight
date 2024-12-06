/* eslint-disable @next/next/no-img-element */
import styles from "./WhatSerosight.module.css";

const WhatSerosight = () => {
  return (
    <section className={styles.hero}>
      <img
        src="/images/whatserosight.webp"
        alt=""
        className={styles.heroImage}
      />
      <div className={styles.content}>
        <h2>What is Serosight</h2>
        <p>
          SeroSight is a biopharmaceutical enterprise that delivers actionable
          insights to consumers through its proprietary immune profiling
          platform technologies. These innovations facilitate the monitoring of
          disease risk, exposure, and overall health status. SeroSight’s
          platforms leverage highly multiplexed immunologic assays to enable
          sensitive, high-resolution analysis of antibodies and other
          immunologic biomarkers from minimal samples, such as less than 1ml of
          serum or a Dried Blood Spot (DBS).
        </p>
      </div>
    </section>
  );
};

export default WhatSerosight;
