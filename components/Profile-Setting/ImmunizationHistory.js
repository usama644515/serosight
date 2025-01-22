import { useEffect, useState } from "react";
import styles from "./ImmunizationHistory.module.css";

export default function ImmunizationHistory() {
  const vaccines = [
    "Influenza", "Covid", "Hep A", "Hep B", "Hep C", "Measles", "Mumps",
    "Rubella", "Pertussis", "Epstein Barr", "West Nile", "Varicella", "RSV"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.heading}>Immunization History</h1>
      </div>

      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Vaccine History</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vaccine Name</th>
              <th>Vaccine Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine) => (
              <tr key={vaccine}>
                <td>{vaccine}</td>
                <td>
                  <div className={styles.radioGroup}>
                    <label>
                      <input type="radio" name={`vaccine-${vaccine}`} value="Yes" /> Yes
                    </label>
                    <label>
                      <input type="radio" name={`vaccine-${vaccine}`} value="No" /> No
                    </label>
                    <label>
                      <input type="radio" name={`vaccine-${vaccine}`} value="Unknown" /> Unknown
                    </label>
                  </div>
                </td>
                <td><input type="date" className={styles.dateInput} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className={styles.title}>Smoking History</h2>
        <div className={styles.smokingHistory}>
          <p>Do you Smoke?</p>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" name="smoke" value="Yes" /> Yes
            </label>
            <label>
              <input type="radio" name="smoke" value="No" /> No
            </label>
          </div>
          <p>How Often do you Smoke?</p>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" name="frequency" value="Weekly" /> Weekly
            </label>
            <label>
              <input type="radio" name="frequency" value="Monthly" /> Monthly
            </label>
            <label>
              <input type="radio" name="frequency" value="Daily" /> Daily
            </label>
          </div>
        </div>

        <h2 className={styles.title}>Medication History</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Medication</th>
              <th>Medication Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((medication) => (
              <tr key={medication}>
                <td>{medication}</td>
                <td>
                  <div className={styles.radioGroup}>
                    <label>
                      <input type="radio" name={`medication-${medication}`} value="Yes" /> Yes
                    </label>
                    <label>
                      <input type="radio" name={`medication-${medication}`} value="No" /> No
                    </label>
                  </div>
                </td>
                <td><input type="date" className={styles.dateInput} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
