import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "./OrderSuccess.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    const { session_id } = router.query;
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const userId = localStorage.getItem("userId");

    if (!session_id || !cartItems || !userId) {
      // toast.error("Missing session or cart details");
      return;
    }
    const deleteBundle = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/cart?userId=${userId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          console.log("Cart deleted successfully");
        } else {
          throw new Error("Failed to delete bundle");
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/verify-payment`, {
          method: "POST",
          body: JSON.stringify({ sessionId: session_id, userId, cartItems }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data.paymentStatus === "completed") {
          // toast.success("Order successfully placed!");
          deleteBundle();
          localStorage.removeItem("cartItems"); // Clear cart on success
        } else {
          throw new Error("Payment not successful");
        }
      } catch (err) {
        toast.error("Payment verification failed. Please try again.");
      }
    };

    verifyPayment();
  }, [router.query]);

  return (
    <div className={styles.successContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>🎉 Order Successful!</h1>
        <p className={styles.message}>
          Thank you for your payment! Your order has been successfully placed.
        </p>
        <button className={styles.button} onClick={() => router.push("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
