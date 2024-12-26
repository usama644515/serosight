/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./DataSelector.module.css";

const DataSelector = () => {
  const [selected, setSelected] = useState({
    immunity: "All",
    vaccineYes: [],
    vaccineNo: [],
    smoking: "All",
  });

  const handleSelect = (category, value) => {
    setSelected((prev) => {
      if (value === "All") {
        return { ...prev, [category]: value };
      } else {
        const newSelection =
          prev[category] === "All" ? [] : [...prev[category]];
        const index = newSelection.indexOf(value);
        if (index > -1) {
          newSelection.splice(index, 1);
        } else {
          newSelection.push(value);
        }
        return {
          ...prev,
          [category]: newSelection.length > 0 ? newSelection : "All",
        };
      }
    });
  };

  const isSelected = (category, value) =>
    selected[category] === "All" ||
    (Array.isArray(selected[category]) && selected[category].includes(value));

  return (
    <>
      <h1 className={styles.title}>Create comparison data.</h1>
      <p className={styles.subtitle}>Select Data Sets</p>
      <div className={styles.container}>
        {/* Find Saved Query */}
        <div className={styles.querySection}>
          <img src="images/search icon.png" alt="" />
          <p>Find Saved Query</p>
        </div>
        <hr className={styles.divider} />
        {/* Immunity Data */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Immunity Data</p>
          <div className={styles.filterOptions}>
            {[
              "All",
              "Mono",
              "Respiratory",
              "Hepatitis",
              "MMR",
              "West Nile",
            ].map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("immunity", item) ? styles.active : ""
                }`}
                onClick={() => handleSelect("immunity", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <hr className={styles.divider} />
        {/* Vaccine Status */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Vaccine Status</p>
          <div>
            <div className={styles.filterOptions}>
              <p>Yes</p>
              {["Mono", "Respiratory", "Hepatitis", "MMR", "West Nile"].map(
                (item) => (
                  <button
                    key={`yes-${item}`}
                    className={`${styles.filterButton} ${
                      isSelected("vaccineYes", item) ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("vaccineYes", item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <br />
            <div className={styles.filterOptions}>
              <p>No</p>
              {["Mono", "Respiratory", "Hepatitis", "MMR", "West Nile"].map(
                (item) => (
                  <button
                    key={`no-${item}`}
                    className={`${styles.filterButton} ${
                      isSelected("vaccineNo", item) ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("vaccineNo", item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
        {/* Smoking Status */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Smoking Status</p>
          <div className={styles.filterOptions}>
            {["All", "Yes", "No"].map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("smoking", item) ? styles.active : ""
                }`}
                onClick={() => handleSelect("smoking", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Save Data Set */}
        <div className={styles.saveSection}>
          <button className={styles.saveButton}>Save Data Set</button>
        </div>
        <hr className={styles.divider2} />
        {/* Saved Data Sets */}
        <div className={styles.savedSection}>
          <h3 className={styles.savedTitle}>Saved Data Sets</h3>
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className={styles.savedItem}>
              <div>
                <input
                  type="checkbox"
                  id={`customCheckbox-${idx}`}
                  className={styles.checkboxInput}
                />
                <label
                  htmlFor={`customCheckbox-${idx}`}
                  className={styles.checkboxLabel}
                ></label>
                <h2>Data Set Name</h2>
                <p>Saved Active Data</p>
              </div>
              <button className={styles.deleteButton}>delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DataSelector;
