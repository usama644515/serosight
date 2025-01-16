import { useEffect, useState } from "react";
import styles from "./ManageSubscription.module.css";
import Link from 'next/link';

export default function ManageSubscription() {
  const [shippingaddress, setShippingaddress] = useState("Loading...");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [renewDate, setrenewDate] = useState('Loading...');
  // const router = useRouter();
  
  //   const handleClick = (path) => {
  //     router.push(path);
  //   };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedDate = localStorage.getItem("subscriptionEndDateFormatted");
    if (storedDate) {
      setrenewDate(storedDate);
    }

    if (userId) {
      const fetchSubscriptionAndAddress = async () => {
        try {
          const shippingResponse = await fetch(
            '/api/shippingAddress?userId=' + userId
          );
          const data = await shippingResponse.json();

          // Check if the response contains the correct data
          console.log("Shipping Data:", data);

          if (data?.shippingAddress?.address) {
            setShippingaddress(data.shippingAddress.address); // Safely access the address
          } else {
            setShippingaddress("Address not available"); // Fallback if data is missing
          }
          setIsDataLoaded(true);
        } catch (error) {
          console.error("Error fetching data:", error);
          setShippingaddress("Error fetching address");
        }
      };

      fetchSubscriptionAndAddress();
    } else {
      setShippingInfo("User ID not found");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Subscription</h1>
        <a href="#" className={styles.cancelLink}>
          Cancel Subscription
        </a>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Subscription Renewal</h3>
          <p>{renewDate}</p>
          {/* <a href="#" className={styles.editLink}>
            EDIT
          </a> */}
        </div>
        <div className={styles.card}>
          <h3>Subscription Plan</h3>
          <p>Charged yearly, allows purchase of 4 test-kits.</p>
          {/* <a href="#" className={styles.editLink}>
            EDIT
          </a> */}
        </div>
        <div className={styles.card}>
          <h3>Shipping Method</h3>
          <p>{shippingaddress}</p>
          <Link href="/shipping-address" className={styles.editLink}>
            EDIT
          </Link>
        </div>
        <div className={styles.card}>
          <h3>Payment Method</h3>
          <p>Default Card</p>
          <Link href="/payment-method" className={styles.editLink}>
            EDIT
          </Link>
        </div>
      </div>
    </div>
  );
}
