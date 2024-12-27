import styles from "./OrderProgress2.module.css";
import { useRouter } from "next/router";

const OrderProgress2 = () => {
     const router = useRouter();
  const handleClick = () => {
    router.push("/shop");
  };
  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Orders In Progress</h1>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.bundleTitle}>No Active Order</h2>
          <p className={styles.description}>test kits arrive in 1-2 weeks.</p>
        </div>
        <button onClick={handleClick} className={styles.testkitButton}>
          Find a Test Kit
        </button>
      </div>
    </div>
  );
};

export default OrderProgress2;
