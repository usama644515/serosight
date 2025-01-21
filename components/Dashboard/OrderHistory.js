/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./OrderHistory.module.css";
import SearchModal from "../Modals/SearchModal";

const OrderHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [testData, setTestData] = useState([]); // State for storing test data
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

  // Function to format the date to "12 January 2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // 'en-GB' ensures the format is DD Month YYYY
  };

  useEffect(() => {
    const fetchTests = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage
      console.log(userId);
      if (!userId) return;

      try {
        const response = await fetch(`/api/test/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setTestData(data);
          console.log(data);
        } else {
          console.error("Failed to fetch test data");
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTests();
  }, []);

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
          {testData.length === 0 ? (
            <div className={styles.noTests}>
              <p>No tests found. Please try again later.</p>
            </div>
          ) : (
            testData.map((test) => (
              <div key={test.testId} className={`${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.bundledate}>
                      Purchased {formatDate(test.purchaseDate)} {/* Format the date here */}
                    </h2>
                    <h2 className={styles.bundleTitle}>{test.itemName}</h2>
                  </div>
                  {test.reportStatus === "In Progress" ? (
                    <p className={styles.status}>Report in Progress...</p>
                  ) : (
                    <button
                      onClick={handleClick}
                      className={styles.reportButton}
                    >
                      Array Report
                    </button>
                  )}
                </div>
                <p className={styles.details}>
                  {test.results === "Pending"
                    ? "Results PENDING"
                    : `Results ${test.results}`}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <SearchModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default OrderHistory;
