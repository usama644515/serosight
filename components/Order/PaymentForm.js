import styles from "./PaymentForm.module.css";

const PaymentForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {/* <button className={styles.backButton}>← Back</button> */}
        <h1 className={styles.heading}>Payment Methods</h1>
      </div>

      <div className={styles.formWrapper}>
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

        {/* Credit Card Details Section */}
        <div className={styles.cardDetails}>
          <h2>Credit Card Details</h2>
          <input type="text" placeholder="Name on Card" />
          <input type="text" placeholder="Card Number" />
          <div className={styles.expiryCvv}>
            <select>
              <option>Month</option>
            </select>
            <select>
              <option>Year</option>
            </select>
            <input type="text" placeholder="Card Security Code" />
          </div>
        </div>

        {/* Billing Address Section */}
        <div className={styles.billingAddress}>
          <h2>Billing Address</h2>
          <select>
            <option>Country</option>
          </select>
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
          <input type="text" placeholder="ZIP Code" />
        </div>
      </div>

      <button className={styles.continueButton}>Continue</button>
    </div>
  );
};

export default PaymentForm;
