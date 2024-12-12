import { useState, useEffect } from "react";
import styles from "./PaymentForm.module.css";

const PaymentForm = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [userId, setUserId] = useState(null);
  const [storedBillingInfo, setStoredBillingInfo] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set client-side flag
  }, []);

  // Fetch user ID from localStorage
  useEffect(() => {
    if (isClient) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        console.log("User ID not found.");
      }
    }
  }, [isClient]);

  // Fetch billing info when user ID is available
  useEffect(() => {
    if (userId) {
      console.log("Fetching billing info for user ID:", userId);
      fetch(`/api/billing?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.billingInfo) {
            setStoredBillingInfo(data.billingInfo);
            setPaymentInfo(data.billingInfo); // Pre-populate form
          }
        })
        .catch((err) => console.error("Failed to fetch billing info", err));
    }
  }, [userId]); // Only trigger when userId is set

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !paymentInfo.address || !paymentInfo.city || !paymentInfo.state ||
      !paymentInfo.zipCode || !paymentInfo.nameOnCard || !paymentInfo.cardNumber ||
      !paymentInfo.expiryMonth || !paymentInfo.expiryYear || !paymentInfo.cvv
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    try {
      const response = await fetch("/api/addbilling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, paymentInfo }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Billing details updated successfully!");
        setStoredBillingInfo(paymentInfo);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error updating billing details:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleDeleteBilling = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your billing details?");
    if (confirmation) {
      try {
        const response = await fetch(`/api/billing?userId=${userId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
          alert("Billing details deleted.");
          setStoredBillingInfo(null);
          setPaymentInfo({
            country: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            nameOnCard: "",
            cardNumber: "",
            expiryMonth: "",
            expiryYear: "",
            cvv: "",
          });
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error deleting billing details:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (!isClient) {
    return null; // Return nothing during SSR
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.heading}>Payment Methods</h1>
      </div>

      <div className={styles.formWrapper}>
        <div>
          <div className={styles.paymentMethods}>
            <h2>Payment Methods</h2>
            <div className={styles.methodIcons}>
              <img src="/images/visa.png" alt="Visa" />
              <img src="/images/mastercard.png" alt="MasterCard" />
              <img src="/images/discover.png" alt="Discover" />
              <img src="/images/american-express.png" alt="American Express" />
            </div>
          </div>

          <div className={styles.billingAddress}>
            <h2>Billing Address</h2>
            <select name="country" value={paymentInfo.country} onChange={handleChange}>
              <option>Country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
            <input
              type="text"
              name="address"
              value={paymentInfo.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              name="city"
              value={paymentInfo.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={paymentInfo.state}
              onChange={handleChange}
              placeholder="State"
            />
            <input
              type="text"
              name="zipCode"
              value={paymentInfo.zipCode}
              onChange={handleChange}
              placeholder="ZIP Code"
            />
          </div>
        </div>

        <div className={styles.cardDetails}>
          <h2>Credit Card Details</h2>
          <input
            type="text"
            name="nameOnCard"
            value={paymentInfo.nameOnCard}
            onChange={handleChange}
            placeholder="Name on Card"
          />
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
          />
          <div className={styles.expiryCvv}>
            <select name="expiryMonth" value={paymentInfo.expiryMonth} onChange={handleChange}>
              <option>Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
            <select name="expiryYear" value={paymentInfo.expiryYear} onChange={handleChange}>
              <option>Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleChange}
              placeholder="CVV"
            />
          </div>
          <button className={styles.continueButton} onClick={handleSubmit}>
            Update Billing Details
          </button>
        </div>
      </div>

      {storedBillingInfo && (
        <div className={styles.billingListContainer}>
          <div className={styles.billingInfo}>
            <h3>Saved Billing Info</h3>
            <p>{`${storedBillingInfo.nameOnCard} - ${storedBillingInfo.cardNumber.slice(-4)}`}</p>
            <button className={styles.deleteButton} onClick={handleDeleteBilling}>
              <img src="/images/delete-icon.png" alt="Delete" />
              Delete Billing Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
