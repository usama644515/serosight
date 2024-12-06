/* eslint-disable @next/next/no-img-element */
import styles from "./SampleReceipt.module.css";

const SampleReceipt = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>Sample Receipt at Our Lab</h2>
        <p>
          After your blood sample arrives at our lab, we scan the activation
          number to ensure we match your sample to you! This activation number
          gets tracked throughout the test process, including multiple quality
          control steps to ensure that your receive the correct result and you
          can be confident in our process.
        </p>
      </div>

      <img src="/images/samplereceipt.webp" alt="" className={styles.heroImage} />
    </section>
  );
};

export default SampleReceipt;
