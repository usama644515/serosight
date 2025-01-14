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

  // Define the step statuses in order
  const stepStatuses = [
    { id: 1, status: "order placed", label: "Order Confirmed" },
    { id: 2, status: "kit sent", label: "Ready to be Shipped" },
    { id: 3, status: "kit received", label: "Received at Warehouse" },
    { id: 4, status: "test completed", label: "On the Way" },
    { id: 5, status: "delivered", label: "Delivered" },
  ];
  const stepStatuses2 = [
    { id: 6, status: "sent return", label: "Sent to return address" },
    { id: 7, status: "received lab", label: "Received at lab" },
    { id: 8, status: "test progress", label: "Testing in progress" },
    { id: 9, status: "result ready", label: "Results Ready" },
  ];

  // Get the index of the current status
  const currentStepIndex = stepStatuses.findIndex(step => step.status === orderStatus);
  const currentStepIndex2 = stepStatuses2.findIndex(step => step.status === orderStatus);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders In Progress</h1>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.bundleTitle}>{cartItems[0].testName}</h2>
          <p className={styles.description}>This test kit will arrive in 1-2 weeks.</p>
        </div>
        <div className={styles.timeline}>
          {stepStatuses.map((step, index) => (
            <div key={step.id} className={styles.stepWrapper}>
              <div className={`${styles.step} ${index <= currentStepIndex ? styles.active : ""}`}>
                <div className={styles.circle}></div>
                <p>{step.label}</p>
              </div>
              {index < stepStatuses.length - 1 && (
                <div className={`${styles.line} ${index < currentStepIndex ? styles.activeLine : ""}`}></div>
              )}
            </div>
          ))}
        </div>
        <br />
        <br />
        <div className={styles.timeline}>
          {stepStatuses2.map((step, index) => (
            <div key={step.id} className={styles.stepWrapper}>
              <div className={`${styles.step} ${index <= currentStepIndex2 ? styles.active : ""}`}>
                <div className={styles.circle}></div>
                <p>{step.label}</p>
              </div>
              {index < stepStatuses2.length - 1 && (
                <div className={`${styles.line} ${index < currentStepIndex2 ? styles.activeLine : ""}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
