import { useEffect, useState } from "react";
import styles from "./OrderHistory.module.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false); // Track hydration

  useEffect(() => {
    setHydrated(true); // Mark component as hydrated

    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage
      if (!userId) {
        console.error("User ID not found in local storage");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders?userId=${userId}`);
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatOrderKey = (orderKey) => {
    // Mock encryption logic to convert to 10-15 character ID
    const hash = btoa(orderKey).slice(0, 15); // Base64 encoding
    return hash;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (!hydrated) {
    // Prevent rendering on server-side
    return null;
  }

  if (loading) {
    return (
      <div className={styles.shimmerContainer}>
        <div className={styles.shimmerCard}></div>
        <div className={styles.shimmerCard}></div>
        <div className={styles.shimmerCard}></div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className={styles.noOrdersContainer}>
        <h2 className={styles.noOrdersMessage}>No orders found</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.heading}>Order History</h1>
      </div>
      {orders.map((order) => (
        <div className={styles.card} key={order._id}>
          <div>
            <p className={styles.status}>
              Order Status: <br />
              <span className={styles[order.orderStatus.toLowerCase().replace(" ", "")]}>
                {order.orderStatus === "order placed" ? "Pending" : order.orderStatus}
              </span>
            </p>
            <p className={styles.details}>
              Delivery: {formatDate(order.orderDate)}
            </p>
            <p className={styles.orderInfo}>
              Order #: <strong>{formatOrderKey(order.orderKey)}</strong>
            </p>
            <p className={styles.orderInfo}>
              Order Date: {formatDate(order.orderDate)}
            </p>
          </div>
          <button className={styles.trackButton}>Track Parcel</button>
        </div>
      ))}
    </div>
  );
}
