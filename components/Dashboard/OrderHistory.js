/* eslint-disable @next/next/no-img-element */
import styles from "./OrderHistory.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchModal from "../Modals/SearchModal";

const OrderHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true); // Open modal when the button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal when needed
  };

  const handleClick = () => {
    router.push("/array-report");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Report History</h1>
        <div className={styles.searchSection} onClick={openModal}>
          <img
            src="/images/search icon.png"
            alt="Search Icon"
            className={styles.searchIcon}
          />
          <p className={styles.searchText}>Search for a Report</p>
        </div>
      </div>
      <div className={styles.timeline}>
        <div className={styles.orders}>
          {/* Respiratory Kit */}
          <div className={`${styles.card}`}>
            <div className={styles.cardHeader}>
              <div>
              <h2 className={styles.bundledate}>Purchased 10/29/2024</h2>
              <h2 className={styles.bundleTitle}>Respiratory Kit</h2>
              </div>
              <p className={styles.status}>Report in Progress...</p>
            </div>
            <p className={styles.details}>Results PENDING</p>
          </div>
          {/* MMR Kit */}
          <div className={`${styles.card}`}>
            <div className={styles.cardHeader}>
              <div>
              <h2 className={styles.bundledate}>Purchased 10/29/2024</h2>
              <h2 className={styles.bundleTitle}>MMR Kitt</h2>
              </div>
              <button onClick={handleClick} className={styles.reportButton}>
                Array Report
              </button>
            </div>
            <p className={styles.details}>Results 11/12/2024</p>
          </div>

         
        </div>
      </div>
      {/* Modal for Sign In */}
      <SearchModal isOpen={isModalOpen} onRequestClose={closeModal} />{" "}
      {/* Modal gets the state and close function */}
    </div>
  );
};

export default OrderHistory;
