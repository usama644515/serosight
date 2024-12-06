/* eslint-disable @next/next/no-img-element */
import styles from "./QualityControl.module.css";

export default function QualityControl() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Quality Control and Consistency</h2>
      <h3 className={styles.subheading}>
        By adhering to these stringent quality control measures and ensuring
        consistent application of our processes, SeroSight delivers reliable,
        high-quality test results that empower our customers to make informed
        health decisions.
      </h3>
      <div className={styles.content}>
        <div className={styles.item}>
          <h2>1. Standard Operating Procedures (SOPs)</h2>
          <p>
            All laboratory procedures are governed by detailed SOPs to ensure
            uniformity in sample handling, processing, and analysis.
          </p>
        </div>
        <div className={styles.item}>
          <h2>2. Calibration and Maintenance</h2>
          <p>
            Regular calibration and maintenance or laboratory equipment are
            conducted to maintain optimal performance and accuracy.
          </p>
        </div>
        <div className={styles.item}>
          <h2>3. Training and Competency</h2>
          <p>
            All laboratory personnel undergo rigorous training and competency
            assessments to ensure they adhere to the highest standards of
            laboratory practice.
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <h2>4. Continuous Improvement</h2>
          <p>
            SeroSight is committed to continuous improvement, regularly
            reviewing and updating protocols based on the latest scientific
            advancements and feedback from quality control audits.
          </p>
        </div>
      </div>
    </section>
  );
}
