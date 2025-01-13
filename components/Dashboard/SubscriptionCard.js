/* eslint-disable @next/next/no-img-element */
// components/SubscriptionCard.js
import { useEffect, useState } from "react";
import styles from "./SubscriptionCard.module.css";
import { useRouter } from "next/router";

export default function SubscriptionCard() {
  const [subscription, setSubscription] = useState(null);
  const router = useRouter();

  const handleClick = () => {
    router.push("/shop");
  };

  useEffect(() => {
    // Fetch the subscription data from the API
    const fetchSubscription = async () => {
      try {
        const response = await fetch("/api/subscription");
        if (response.ok) {
          const data = await response.json();
          // Assuming you're fetching a single subscription, adapt if fetching multiple
          setSubscription(data[0]); // Set the first subscription for now
        } else {
          console.error("Failed to fetch subscription data");
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchSubscription();
  }, []); // Empty array ensures this runs once when component mounts

  // Return loading if data isn't available yet
  if (!subscription) {
    return (
      <div className={styles.card}>
        <div className={styles.left}>
          <img
            src="/images/no subscription2.png" // Replace with the actual image path
            alt="Happy person"
            className={styles.image}
          />
        </div>
        <div className={styles.right}>
          <h3 className={styles.subscriptionType}>YEARLY SUBSCRIPTION</h3>
          <p className={styles.description}>
            <strong>Empower</strong> you and your doctor with{" "}
            <strong>seasonal immunity check-ups!</strong>
          </p>
          <img
            src="/images/no subscription.png" // Replace with the actual image path
            alt="No subscription"
            className={styles.image2}
          />
          <button onClick={handleClick} className={styles.button}>
            Learn More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.chart}>
          <div className={styles.donut}>
            <svg viewBox="0 0 36 36" className={styles.circularChart}>
              <path
                className={styles.circleBg}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.circle}
                strokeDasharray={`${
                  (subscription.numberOfTests / 4) * 100
                }, 100`} // Adjust based on remaining tests
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
        <div className={styles.text}>
          <span className={styles.bigText}>{subscription.numberOfTests}</span>
          <span>of</span>
          <span className={styles.bigText}>4</span>
          <p>kits remaining this year</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainer}>
          <img
            src="/images/subscription.png"
            alt="Product"
            className={styles.image}
          />
        </div>
        <button className={styles.button}>Order Remaining Kits</button>
      </div>
    </div>
  );
}
