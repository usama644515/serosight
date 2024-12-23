import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    const { session_id } = router.query;
    if (!session_id) {
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/verify-payment`, {
          method: "POST",
          body: JSON.stringify({ sessionId: session_id }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data.paymentStatus === "paid") {
          // Show success message on successful payment
          toast.success("Order successfully placed!");
        } else {
          throw new Error("Payment not successful");
        }
      } catch (err) {
        toast.error("Payment failed. Please try again.");
      }
    };

    verifyPayment();
  }, [router.query]);

  return (
    <div>
      <h1>Order Success</h1>
      <p>Your payment was successful!</p>
    </div>
  );
}
