// components/OrderProgress.js
import { useEffect, useState } from "react";
import styles from './OrderProgress.module.css';

const OrderProgress = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch('/api/orders/latest');
        if (response.ok) {
          const data = await response.json();
          setOrder(data); // Set the fetched order data
        } else {
          console.error("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrder();
  }, []);

  // If order data is not yet fetched, show loading
  if (!order) {
    return <div>Loading...</div>;
  }

  const { orderStatus, cartItems } = order;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders In Progress</h1>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.bundleTitle}>{cartItems[0].testName}</h2>
          <p className={styles.description}>This test kit will arrive in 1-2 weeks.</p>
        </div>
        <div className={styles.timeline}>
          <div className={`${styles.step} ${orderStatus === "order placed" ? styles.active : ""}`}>
            <div className={styles.circle}></div>
            <p>Order Confirmed</p>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.step} ${orderStatus === "kit sent" ? styles.active : ""}`}>
            <div className={styles.circle}></div>
            <p>Ready to be Shipped</p>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.step} ${orderStatus === "kit received" ? styles.active : ""}`}>
            <div className={styles.circle}></div>
            <p>Received at Warehouse</p>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.step} ${orderStatus === "test completed" ? styles.active : ""}`}>
            <div className={styles.circle}></div>
            <p>On the Way</p>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.step} ${orderStatus === "test completed" ? styles.active : ""}`}>
            <div className={styles.circle}></div>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
