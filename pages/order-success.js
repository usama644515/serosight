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
    const userEmail = localStorage.getItem("email");
    const bundleName = localStorage.getItem("bundleName");

    if (!session_id || !cartItems || !userId || !userEmail || !bundleName) {
      return;
    }

    const createSubscription = async () => {
      try {
        const currentDate = new Date();
        const endDate = new Date();
        endDate.setFullYear(currentDate.getFullYear() + 1);

        const res = await fetch(`/api/subscription`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            startDate: currentDate.toISOString(),
            endDate: endDate.toISOString(),
            numberOfTests: cartItems.length,
          }),
        });

        if (res.ok) {
          console.log("Subscription created successfully");
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to create subscription");
        }
      } catch (err) {
        console.error("Error creating subscription:", err.message);
      }
    };

    const deleteBundle = async () => {
      try {
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: session_id,
            userId,
            cartItems,
            email: userEmail,
          }),
        });

        const data = await res.json();

        if (res.ok && data.paymentStatus === "completed") {
          toast.success("Order successfully placed!");

          if (bundleName === "Subscription") {
            await createSubscription();
          }

          deleteBundle();
          localStorage.removeItem("cartItems");
          localStorage.removeItem("bundleName");
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
