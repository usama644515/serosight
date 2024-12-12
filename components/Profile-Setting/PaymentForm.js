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

  const [userId, setUserId] = useState(null); // State to hold the userId

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() + i
  );

  // Get the userId from local storage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Retrieve userId from local storage
    if (storedUserId) {
      setUserId(storedUserId); // Set the userId if it exists in local storage
    }
  }, []); // Empty dependency array to run only once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (
      !paymentInfo.address ||
      !paymentInfo.city ||
      !paymentInfo.state ||
      !paymentInfo.zipCode ||
      !paymentInfo.nameOnCard ||
      !paymentInfo.cardNumber ||
      !paymentInfo.expiryMonth ||
      !paymentInfo.expiryYear ||
      !paymentInfo.cvv
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Ensure that userId is present
    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    // Send the data to the API
    const response = await fetch("/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId, // Send userId with the payment info
        paymentInfo,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Billing details updated successfully!");
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.heading}>Payment Methods</h1>
      </div>

      <div className={styles.formWrapper}>
        <div>
          {/* Payment Methods Section */}
          <div className={styles.paymentMethods}>
            <h2>Payment Methods</h2>
            <div className={styles.methodIcons}>
              <img src="/images/visa.png" alt="Visa" />
              <img src="/images/mastercard.png" alt="MasterCard" />
              <img src="/images/discover.png" alt="Discover" />
              <img src="/images/american-express.png" alt="American Express" />
            </div>
          </div>

          {/* Billing Address Section */}
          <div className={styles.billingAddress}>
            <h2>Billing Address</h2>
            <select
              name="country"
              value={paymentInfo.country}
              onChange={handleChange}
            >
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

        {/* Credit Card Details Section */}
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
            <select
              name="expiryMonth"
              value={paymentInfo.expiryMonth}
              onChange={handleChange}
            >
              <option>Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="expiryYear"
              value={paymentInfo.expiryYear}
              onChange={handleChange}
            >
              <option>Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
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
    </div>
  );
};

export default PaymentForm;
