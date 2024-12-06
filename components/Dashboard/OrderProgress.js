import styles from './OrderProgress.module.css';

const OrderProgress = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders In Progress</h1>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.bundleTitle}>Flu Bundle</h2>
          <p className={styles.description}>
            this test kit will arrive in 1-2 weeks.
          </p>
        </div>
        <div className={styles.timeline}>
          <div className={`${styles.step} ${styles.active}`}>
            <div className={styles.circle}></div>
            <p>order confirmed</p>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.step} ${styles.active}`}>
            <div className={styles.circle}></div>
            <p>ready to be shipped</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.step}>
            <div className={styles.circle}></div>
            <p>Received at warehouse</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.step}>
            <div className={styles.circle}></div>
            <p>On the way</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.step}>
            <div className={styles.circle}></div>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
