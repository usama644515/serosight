/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./TestSelection.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

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
    const fetchTestAndSubscriptionDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch test details and subscription data concurrently
        const [testResponse, subscriptionResponse] = await Promise.all([ 
          axios.get("/api/tests"), 
          axios.get("/api/getSubscription?id=676d61aeff71f3d1213fe671") 
        ]);

        // Process test details
        const tests = testResponse?.data.reduce((acc, test) => {
          acc[test.name] = { description: test.description, price: [] };
          return acc;
        }, {});

        // Process subscription data and update the tests with the subscription price
        if (subscriptionResponse?.data) {
          const subscriptionPrice = subscriptionResponse.data.price;
          // Assuming the price is an array in the subscription document
          Object.keys(tests).forEach((testName) => {
            tests[testName].price = subscriptionPrice; // Use the subscription price
          });
        }

        setTestDetails(tests);
      } catch (error) {
        console.error("Error fetching test or subscription details:", error);
        toast.error("Failed to fetch test or subscription details. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestAndSubscriptionDetails();
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
    setSelectedTests([]); // Clear previously selected tests when bundle changes
    setCurrentIndex(0);
  };

  const goToNextTest = () => {
    if (selectedTests.length > 1) {
      setCurrentIndex((currentIndex + 1) % selectedTests.length);
    }
  };

  const goToPreviousTest = () => {
    if (selectedTests.length > 1) {
      setCurrentIndex((currentIndex - 1 + selectedTests.length) % selectedTests.length);
    }
  };

  const currentTest = selectedTests[currentIndex];

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId"); // Ensure user is logged in
    if (!userId) {
      toast.warning("Please log in first!", { position: "bottom-right", autoClose: 5000 });
      return;
    }

    if (selectedTests.length > 0) {
      try {
        // Prepare the tests array with required data
        const testsToAdd = selectedTests.map((test) => ({
          testName: test,
          price: testDetails[test]?.price,
        }));

        // Calculate the total price of the bundle (use the price of the selected bundle, not based on number of tests)
        const bundlePrice = getPriceForCurrentBundle(selectedTests[0]);

        console.log("Tests to Add:", testsToAdd);
        console.log("Bundle Price:", bundlePrice);

        const response = await axios.post("/api/cart", {
          userId: userId,
          bundleName: selectedBundle, // Send the selected bundle name
          items: testsToAdd, // Send the array of tests
          bundlePrice: bundlePrice, // Send the bundle price
        });

        if (response.status === 200) {
          toast.success("Added to Cart!", {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to Cart. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    }
  };

  // Function to get price according to the selected bundle
  const getPriceForCurrentBundle = (testName) => {
    const priceArray = testDetails[testName]?.price;
    if (!priceArray) return "N/A";

    switch (selectedBundle) {
      case "Single Test":
        return priceArray[0] || "N/A";
      case "Two Tests":
        return priceArray[1] || "N/A";
      case "Subscription":
        return priceArray[2] || "N/A"; // Always use subscription price
      default:
        return "N/A";
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
              Click on a test to learn more and choose a bundle to select multiple tests.
            </p>
            <ul className={styles.testList}>
              {Object.keys(testDetails).map((test) => (
                <li key={test} className={styles.testItem}>
                  <label
                    className={`${styles.testLabel} ${selectedTests.includes(test) ? styles.selected : ""}`}
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
                        ${getPriceForCurrentBundle(currentTest)}
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
                    {["Single Test", "Two Tests", "Subscription"].map((bundle) => (
                      <label
                        key={bundle}
                        className={`${styles.bundleOption} ${selectedBundle === bundle ? styles.selected : ""}`}
                      >
                        <img
                          src={`/images/${bundle.toLowerCase().replace(" ", "-")}.png`}
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
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Navigation */}
            {selectedTests.length > 1 && (
              <div className={styles.sliderNavigation}>
                <button onClick={goToPreviousTest} className={styles.navButton}>
                  &#8592;
                </button>
                <div className={styles.dots}>
                  {selectedTests.map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
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
