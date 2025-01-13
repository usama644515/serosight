/* eslint-disable @next/next/no-img-element */
import styles from "./AccountSettings.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const AccountSettings = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/profile");
  };
  const handleClick2 = () => {
    router.push("/shipping-address");
  };
  const handleClick3 = () => {
    router.push("/payment-method");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>

        <div className={styles.searchSection} onClick={handleClick}>
          <img
            src="/images/setting icon.png"
            alt=""
            className={styles.searchIcon}
          />

          
            <p className={styles.searchText}>View More Settings</p>{" "}
         
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.card} onClick={handleClick}>
          <span className={styles.cardIcon}>
            <img src="/images/setting.png" alt="" className={styles.icons} />
          </span>
          <p>Account Setting</p>
        </div>
        <div className={styles.card} onClick={handleClick2}>
          <span className={styles.cardIcon}>
            <img src="/images/address.png" alt="" className={styles.icons} />
          </span>
          <p>Shipping Addresses</p>
        </div>
        <div className={styles.card} onClick={handleClick3}>
          <span className={styles.cardIcon}>
            <img src="/images/card.png" alt="" className={styles.icons} />
          </span>
          <p>Billing Info</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
