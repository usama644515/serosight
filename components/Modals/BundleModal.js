/* eslint-disable @next/next/no-img-element */
import styles from "./BundleModal.module.css";
import { useState } from "react";

const BundleModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onRequestClose}>
      <div
        className={styles.container}
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src="/images/single-test.png"
              alt=""
            />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Yearly Subscription</h2>
            <p className={styles.description}>
              By purchasing our yearly subscription, you will be able to receive
              4 tests per year. Select the subscription bundle option at
              checkout and you will be able to choose up to 4 test-kits. You can
              view the amount of test-kits you have left under the subscription
              tab on your account profile page.
            </p>
            <p className={styles.cost}>$Cost</p>
            <button className={styles.button}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleModal;
