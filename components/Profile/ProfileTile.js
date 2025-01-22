/* eslint-disable @next/next/no-img-element */
import styles from "./ProfileTile.module.css";
import { useRouter } from "next/router";

export default function ProfileTile() {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <div onClick={() => handleClick("/immunization-history")} className={styles.card}>
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/Immunization.png"
            alt="Payment Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Immunization History</h3>
          <p className={styles.subtitle}>update your immunization records</p>
        </div>
      </div>

      <div
        onClick={() => handleClick("/payment-method")}
        className={styles.card}
      >
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/card2.png"
            alt="Payment Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Payment Methods</h3>
          <p className={styles.subtitle}>Change your payment methods</p>
        </div>
      </div>

      <div
        onClick={() => handleClick("/order-history")}
        className={styles.card}
      >
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/clock.png"
            alt="Order Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Order History</h3>
          <p className={styles.subtitle}>View your past and pending orders</p>
        </div>
      </div>

      <div
        onClick={() => handleClick("/shipping-address")}
        className={styles.card}
      >
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/home.png"
            alt="Shipping Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Shipping Addresses</h3>
          <p className={styles.subtitle}>Change your shipping addresses</p>
        </div>
      </div>

      <div className={styles.card} onClick={() => handleClick("/subscription")}>
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/unlock.png"
            alt="Activation Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Subscriptions</h3>
          <p className={styles.subtitle}>manage your subscriptions</p>
        </div>
      </div>

      <h1 className={styles.title2}>General Settings</h1>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/privacy.png"
            alt="Privacy Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Privacy</h3>
          <p className={styles.subtitle}>Update your account passwords</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/bell.png"
            alt="Notification Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Notifications</h3>
          <p className={styles.subtitle}>Adjust your notification settings</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
            className={styles.iconImage}
            src="/images/chat.png"
            alt="Language Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Language</h3>
          <p className={styles.subtitle}>Change your language settings</p>
        </div>
      </div>
    </div>
  );
}
