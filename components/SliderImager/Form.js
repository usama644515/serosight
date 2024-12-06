import React from "react";
import styles from "./Form.module.css";

export default function Form() {
  return (
    <section>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <h1>How to Order</h1>
          <p>
            Currently taking Pre-Orders <br />
            <span className={styles.price}>Starting at $16,000</span>
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <section className={styles.formSection}>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>First, Last Name</label>
                <input type="text" placeholder="Name" />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="Email" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" />
              </div>
              <div className={styles.inputGroup}>
                <label>Company</label>
                <input type="text" placeholder="Company" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroupFull}>
                <label>Other Information</label>
                <input type="text" placeholder="Other Information" />
              </div>
            </div>
            <div className={styles.buttonBox}>
            <button type="submit" className={styles.submitButton}>
              <span className={styles.lockIcon}>🔒</span> Submit
            </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
