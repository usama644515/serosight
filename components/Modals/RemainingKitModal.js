import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './RemainingKitModal.module.css';

const RemainingKitModal = ({ isOpen, onRequestClose, maxTests = 0, user = {} }) => {
  const [testDetails, setTestDetails] = useState({});
  const [selectedTests, setSelectedTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTestAndSubscriptionDetails = async () => {
      setIsLoading(true);
      try {
        const testResponse = await axios.get('/api/tests');
        const tests = testResponse?.data.reduce((acc, test) => {
          acc[test.name] = { description: test.description };
          return acc;
        }, {});
        setTestDetails(tests);
      } catch (error) {
        console.error('Error fetching test details:', error);
        toast.error('Failed to fetch test details. Please try again.', {
          position: 'bottom-right',
          autoClose: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestAndSubscriptionDetails();
  }, []);

  const handleTestChange = (test) => {
    setSelectedTests((prev) => {
      if (prev.includes(test)) {
        return prev.filter((t) => t !== test);
      }
      if (prev.length < maxTests) {
        return [...prev, test];
      } else {
        toast.warn(`You can only select up to ${maxTests} tests.`, {
          position: 'bottom-right',
          autoClose: 5000,
        });
        return prev;
      }
    });
  };

  const handleOrderPlacement = async () => {
    if (selectedTests.length === 0) {
      toast.error('Please select at least one test before placing an order.', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/saveOrder', {
        userId: localStorage.getItem("userId"), // Assuming `user` contains the user data
        email: localStorage.getItem("email"),
        cartItems: selectedTests.map((test) => ({ testName: test })),
        decrementTests: selectedTests.length,
      });

      if (response.status === 200) {
        toast.success('Order placed successfully!', {
          position: 'bottom-right',
          autoClose: 5000,
        });
        setSelectedTests([]);
        onRequestClose();
      } else {
        toast.error('Failed to place the order. Please try again.', {
          position: 'bottom-right',
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing the order. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onRequestClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalInner}>
          {isLoading ? (
            <div className={styles.loader}>Loading...</div>
          ) : (
            <div className={styles.modalContent}>
              <div className={styles.sidebar}>
                <h2 className={styles.title}>Choose Your Remaining Test</h2>
                <p className={styles.description}>
                  You can select up to {maxTests} tests.
                </p>
                <ul className={styles.testList}>
                  {Object.keys(testDetails).map((test) => (
                    <li key={test} className={styles.testItem}>
                      <label
                        className={`${styles.testLabel} ${selectedTests.includes(test) ? styles.selected : ''}`}
                      >
                        <input
                          type="checkbox"
                          value={test}
                          checked={selectedTests.includes(test)}
                          onChange={() => handleTestChange(test)}
                          className={styles.checkbox}
                          disabled={
                            !selectedTests.includes(test) && selectedTests.length >= maxTests
                          }
                        />
                        {test}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.footer}>
                <button
                  className={styles.submitButton}
                  onClick={handleOrderPlacement}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemainingKitModal;
