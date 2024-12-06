/* eslint-disable @next/next/no-img-element */
import styles from "./Process.module.css";

const Process = () => {
  return (
    <section className={styles.process}>
      <h2 className={styles.title}>OUR BLOOD TESTING PROCESS</h2>
      <div className={styles.stepsBox}>
        <div className={styles.item}>
          <div className={styles.box}>
            <img src="/images/home.png" alt="Collect Sample" className={styles.itemImage} />
          </div>
          <h3>Collect an at-home blood sample</h3>
        </div>
        <div className={styles.item}>
          <div className={styles.box}>
            <img src="/images/mail.png" alt="Mail Sample" className={styles.itemImage} />
          </div>
          <h3>Mail your pre-stamped test kit back to us</h3>
        </div>
        <div className={styles.item}>
          <div className={styles.box}>
            <img src="/images/lcd.png" alt="Receive Results" className={styles.itemImage} />
          </div>
          <h3>Receive results online 1 week after we receive your sample</h3>
        </div>
      </div>
    </section>
  );
};

export default Process;
