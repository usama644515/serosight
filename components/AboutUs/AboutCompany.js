/* eslint-disable @next/next/no-img-element */
import styles from "./OurValues.module.css";

const OurValues = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>About the Company</h2>
        <p>
          SeroSight is a blood testing company located in Irvine, California.
          The company’s cutting-edge peptide and protein microarray technologies
          enable exhaustive analyses of immunologic profiles across individuals
          and populations over time. This capability holds significant promise
          for generating vast amounts of human immunity data, which are crucial
          for unraveling disease patterns and immunologic responses. Such
          insights are pivotal for the discovery and development of novel
          therapeutics, diagnostics, and vaccines.
        </p>
      </div>

      <img src="/images/aboutcompany.webp" alt="" className={styles.heroImage} />
    </section>
  );
};

export default OurValues;
