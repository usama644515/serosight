import React, { useState, useEffect } from "react";
import styles from "./TestSelection.module.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

const TestSelection = () => {
  const scrollToBundleSection = () => {
    const BundleSection = document.getElementById("bundle-section");
    if (BundleSection) {
      BundleSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [testDetails, setTestDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState("Single Test");
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxSelection = {
    "Single Test": 1,
    "Two Tests": 2,
    Subscription: 4,
  };

  useEffect(() => {
    const fetchTestDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/tests");
        const tests = response.data.reduce((acc, test) => {
          acc[test.name] = {
            description: test.description,
            price: `$${test.price}`,
          };
          return acc;
        }, {});
        setTestDetails(tests);
      } catch (error) {
        console.error("Error fetching test details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestDetails();
  }, []);

  const handleTestChange = (test) => {
    if (selectedTests.includes(test)) {
      setSelectedTests(selectedTests.filter((t) => t !== test));
      setCurrentIndex(0);
    } else if (selectedTests.length < maxSelection[selectedBundle]) {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleBundleChange = (bundle) => {
    setSelectedBundle(bundle);
    setSelectedTests([]);
    setCurrentIndex(0);
  };

  const goToNextTest = () => {
    if (selectedTests.length > 1) {
      setCurrentIndex((currentIndex + 1) % selectedTests.length);
    }
  };

  const goToPreviousTest = () => {
    if (selectedTests.length > 1) {
      setCurrentIndex(
        (currentIndex - 1 + selectedTests.length) % selectedTests.length
      );
    }
  };

  const currentTest = selectedTests[currentIndex];

  // Handle adding to cart
  const handleAddToCart = async () => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.warning('Please log in first!', {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }

    if (currentTest) {
      try {
        const response = await axios.post("/api/cart", {
          userId: userId, // Get the user ID from localStorage
          testName: currentTest,
          price: testDetails[currentTest].price,
        });
        
        if (response.status === 200) {
          toast.success('Added to Cart!', {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add to Cart', {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      {isLoading ? (
        <div className={styles.shimmerContainer}></div>
      ) : (
        <>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <h2 className={styles.title}>Choose your test</h2>
            <p className={styles.description}>
              Click on a test to learn more and choose a bundle to select
              multiple tests.
            </p>
            <ul className={styles.testList}>
              {Object.keys(testDetails).map((test) => (
                <li key={test} className={styles.testItem}>
                  <label
                    className={`${styles.testLabel} ${
                      selectedTests.includes(test) ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={test}
                      checked={selectedTests.includes(test)}
                      onChange={() => handleTestChange(test)}
                      className={styles.checkbox}
                    />
                    {test}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Card */}
          <div className={styles.card}>
            <div className={styles.carditem}>
              {/* Test Kit Image and Details */}
              <div className={styles.cardHeader}>
                <img src="/images/test kit.png" alt="Test kit" />
              </div>
              <div className={styles.cardDetails}>
                {currentTest ? (
                  <>
                    <h3 className={styles.cardTitle}>{currentTest}</h3>
                    <p className={styles.cardDescription}>
                      {testDetails[currentTest].description}
                    </p>
                    <div className={styles.priceandcart}>
                      <p className={styles.cardPrice}>
                        {testDetails[currentTest].price}
                      </p>
                      <button
                        className={styles.addToCart}
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </>
                ) : (
                  <p className={styles.noTests}>No tests selected</p>
                )}
                {/* Bundle Section */}
                <div className={styles.bundleHeading}>
                  <h4 className={styles.bundleTitle}>Choose a Bundle</h4>
                  <h4
                    className={styles.bundlelearmore}
                    onClick={scrollToBundleSection}
                  >
                    Learn More
                  </h4>
                </div>
                <div className={styles.bundleSection}>
                  <div className={styles.bundleOptions}>
                    {["Single Test", "Two Tests", "Subscription"].map(
                      (bundle) => (
                        <label
                          key={bundle}
                          className={`${styles.bundleOption} ${
                            selectedBundle === bundle ? styles.selected : ""
                          }`}
                        >
                          <img
                            src={`/images/${bundle
                              .toLowerCase()
                              .replace(" ", "-")}.png`}
                            alt={bundle}
                            className={styles.bundleImage}
                          />
                          <div className={styles.bundleText}>
                            <input
                              type="checkbox"
                              value={bundle}
                              checked={selectedBundle === bundle}
                              onChange={() => handleBundleChange(bundle)}
                              className={styles.radio}
                            />{" "}
                            {bundle}
                          </div>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Navigation */}
            {selectedTests.length > 1 && (
              <div className={styles.sliderNavigation}>
                <button
                  onClick={goToPreviousTest}
                  className={styles.navButton}
                >
                  &#8592;
                </button>
                <div className={styles.dots}>
                  {selectedTests.map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.dot} ${
                        index === currentIndex ? styles.activeDot : ""
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    ></span>
                  ))}
                </div>
                <button onClick={goToNextTest} className={styles.navButton}>
                  &#8594;
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TestSelection;
