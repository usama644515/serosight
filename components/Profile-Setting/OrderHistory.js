import styles from './OrderHistory.module.css';

export default function OrderHistory() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.heading}>Order History</h1>
      </div>
      <button className={styles.backButton}>&larr; Back</button>

      <div className={styles.card}>
        <p className={styles.status}>Order Status: <span className={styles.delivered}>Delivered</span></p>
        <p className={styles.details}>Estimated Delivery: Monday, December 9th, 2024</p>
        <p className={styles.orderInfo}>Order #: <strong>1234567890</strong></p>
        <p className={styles.orderInfo}>Order Date: December 3rd, 2024</p>
        <button className={styles.trackButton}>Track Parcel</button>
      </div>

      <div className={styles.card}>
        <p className={styles.status}>Order Status: <span className={styles.ordered}>Ordered</span></p>
        <p className={styles.details}>Delivery: Wednesday, September 13th, 2024</p>
        <p className={styles.orderInfo}>Order #: <strong>1234567890</strong></p>
        <p className={styles.orderInfo}>Order Date: September 3rd, 2024</p>
        <div className={styles.actions}>
          <button className={styles.viewButton}>View Order</button>
          <button className={styles.cancelButton}>Cancel Order</button>
        </div>
      </div>
    </div>
  );
}
