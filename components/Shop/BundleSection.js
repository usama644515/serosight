/* eslint-disable @next/next/no-img-element */

import styles from './BundleSection.module.css';
import BundleModal from "../Modals/BundleModal";
import { useState, useEffect } from "react";

export default function BundleSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };
  return (
    <div className={styles.container} id='bundle-section'>
      <h1 className={styles.heading}>Our Bundles</h1>
      <p className={styles.subheading}>
        Our bundles can help you achieve maximum care by allowing you to choose between one-time and long-term services.
      </p>
      <div className={styles.cardsContainer} onClick={openModal}>
        <div className={styles.card}>
        <h2 className={styles.cardTitle}>Single Test</h2>
        <p className={styles.cardType}>One-Time</p>
          <div className={styles.imageContainer}><img src="/images/single-test.png" alt="" /></div>
          
          <p className={styles.cardDescription}>
            This is a one-time purchase that offers <strong>1 test kit</strong> for a test of your choice.
          </p>
        </div>
        <div className={styles.card}>
        <h2 className={styles.cardTitle}>Two Test</h2>
        <p className={styles.cardType}>One-Time</p>
          <div className={styles.imageContainer}><img src="/images/two-tests.png" alt="" /></div>
          
          <p className={styles.cardDescription}>
            This is a one-time purchase that offers <strong>2 test kits</strong> for a test of your choice.
          </p>
        </div>
        <div className={styles.card}>
        <h2 className={styles.cardTitle}>Subscription</h2>
        <p className={styles.cardType}>Long-Term</p>
          <div className={styles.imageContainer}><img src="/images/subscription.png" alt="" /></div>
          
          <p className={styles.cardDescription}>
            This is a long-term plan that offers up to <strong>4 tests per year</strong>.
          </p>
          {/* <a className={styles.learnMore} href="#">Learn More</a> */}
        </div>
      </div>
      <BundleModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}
