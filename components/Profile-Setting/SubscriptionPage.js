import { useEffect, useState } from "react";
import styles from "./OrderHistory.module.css";
import SubscriptionCard from "../Dashboard/SubscriptionCard";

export default function SubscriptionPage() {


  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.heading}>Subscriptions</h1>
        
      </div>
      <SubscriptionCard />
    </div>
  );
}
