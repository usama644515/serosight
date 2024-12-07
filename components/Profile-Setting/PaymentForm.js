import styles from "./PaymentForm.module.css";

const PaymentForm = () => {
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
            <select>
              <option>Country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="ZIP Code" />
          </div>
        </div>
        {/* Credit Card Details Section */}
        <div className={styles.cardDetails}>
          <h2>Credit Card Details</h2>
          <input type="text" placeholder="Name on Card" />
          <input type="text" placeholder="Card Number" />
          <div className={styles.expiryCvv}>
            <select>
              <option>Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select>
              <option>Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <input type="text" placeholder="CVV" />
          </div>
          <button className={styles.continueButton}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
