import { useState, useEffect } from "react";
import styles from "./ShippingAddress.module.css";

export default function ShippingAddress() {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const [isAddressLoaded, setIsAddressLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("User ID not found.");
    }
  }, []);

  // Fetch shipping address from the backend
  useEffect(() => {
    if (userId) {
      const fetchShippingAddress = async () => {
        try {
          const response = await fetch('/api/shippingAddress?userId=' + userId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          if (data.shippingAddress) {
            setShippingInfo(data.shippingAddress);
            setIsAddressLoaded(true);
          }
        } catch (error) {
          console.error("Error fetching shipping address:", error);
        }
      };

      fetchShippingAddress();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is not available.");
      return;
    }

    const response = await fetch("/api/shippingAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, shippingInfo }),
    });

    const data = await response.json();
    if (data.message) {
      alert(data.message);
      setIsAddressLoaded(false); // Reload the data to display the updated info
    } else {
      alert(data.error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Banner */}
      <div className={styles.banner}>
        <h1 className={styles.heading}>Shipping Address</h1>
      </div>

      {/* Back Button */}
      {/* <button className={styles.backButton}>&larr; Back</button> */}

      {/* Shipping Address Form */}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        <input
          className={styles.inputFull}
          type="text"
          name="address"
          value={shippingInfo.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          className={styles.inputFull}
          type="text"
          name="city"
          value={shippingInfo.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <div className={styles.row}>
          <input
            className={styles.input}
            type="text"
            name="country"
            value={shippingInfo.country}
            onChange={handleInputChange}
            placeholder="Country"
          />
          <input
            className={styles.input}
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleInputChange}
            placeholder="State"
          />
          <input
            className={styles.input}
            type="text"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleInputChange}
            placeholder="Zip Code"
          />
        </div>

        {/* Submit Button */}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            SAVE INFO
          </button>
        </div>
      </form>

      {/* Display Saved Shipping Details */}
      {isAddressLoaded && (
        <div className={styles.savedInfo}>
          <h2>Saved Shipping Details</h2>
          <div className={styles.savedDetails}>
            <p><strong>Name:</strong> {shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p><strong>Address:</strong> {shippingInfo.address}</p>
            <p><strong>City:</strong> {shippingInfo.city}</p>
            <p><strong>Country:</strong> {shippingInfo.country}</p>
            <p><strong>State:</strong> {shippingInfo.state}</p>
            <p><strong>Zip Code:</strong> {shippingInfo.zipCode}</p>
          </div>
        </div>
      )}
    </div>
  );
}
