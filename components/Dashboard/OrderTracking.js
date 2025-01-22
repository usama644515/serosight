import { useEffect, useState } from "react";
import styles from "./OrderTracking.module.css";

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Only fetch order data if orderId is available
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/latest?orderId=${orderId}`);
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
    }
  }, [orderId]); // Re-run when orderId changes

  if (!order) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const { orderStatus, cartItems } = order;

  // Define the step statuses in order
  const stepStatuses = [
    { id: 1, status: "order placed", label: "Order Confirmed" },
    { id: 2, status: "kit sent", label: "Kit waiting to be sent" },
    { id: 3, status: "kit received", label: "Kit sent, waiting for reply" },
    { id: 4, status: "test completed", label: "Reply received in testing" },
    { id: 5, status: "delivered", label: "Testing completed" },
  ];

  // Get the index of the current status
  const currentStepIndex = stepStatuses.findIndex(
    (step) => step.status === orderStatus
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Tracking</h1>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.bundleTitle}>{cartItems[0]?.testName || "Test Kit"}</h2>
          <p className={styles.description}>
            This test kit will arrive in 1-2 weeks.
          </p>
        </div>
        <div className={styles.timeline}>
          {stepStatuses.map((step, index) => (
            <div key={step.id} className={styles.stepWrapper}>
              <div
                className={`${styles.step} ${index <= currentStepIndex ? styles.active : ""}`}
              >
                <div className={styles.circle}></div>
                <p>{step.label}</p>
              </div>
              {index < stepStatuses.length - 1 && (
                <div
                  className={`${styles.line} ${index < currentStepIndex ? styles.activeLine : ""}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
