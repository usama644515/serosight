import React, { useState } from "react";
import styles from "./DataSelector.module.css";

const DataSelector = () => {
  const [selected, setSelected] = useState({
    immunity: "All",
    vaccineYes: "",
    vaccineNo: "",
    smoking: "All",
  });

  const handleSelect = (category, value) => {
    setSelected((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create comparison data.</h1>
      <p className={styles.subtitle}>Select Data Sets</p>

      {/* Find Saved Query */}
      <div className={styles.querySection}>
        <input
          type="text"
          placeholder="Find Saved Query"
          className={styles.searchInput}
        />
      </div>

      {/* Immunity Data */}
      <div className={styles.filterGroup}>
        <p className={styles.filterLabel}>Immunity Data</p>
        <div className={styles.filterOptions}>
          {["All", "Mono", "Respiratory", "Hepatitis", "MMR", "West Nile"].map(
            (item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  selected.immunity === item ? styles.active : ""
                }`}
                onClick={() => handleSelect("immunity", item)}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Vaccine Status */}
      <div className={styles.filterGroup}>
        <p className={styles.filterLabel}>Vaccine Status</p>
        <div className={styles.filterOptions}>
          <p>Yes</p>
          {["Mono", "Respiratory", "Hepatitis", "MMR", "West Nile"].map(
            (item) => (
              <button
                key={`yes-${item}`}
                className={`${styles.filterButton} ${
                  selected.vaccineYes === item ? styles.active : ""
                }`}
                onClick={() => handleSelect("vaccineYes", item)}
              >
                {item}
              </button>
            )
          )}
        </div>
        <div className={styles.filterOptions}>
          <p>No</p>
          {["Mono", "Respiratory", "Hepatitis", "MMR", "West Nile"].map(
            (item) => (
              <button
                key={`no-${item}`}
                className={`${styles.filterButton} ${
                  selected.vaccineNo === item ? styles.active : ""
                }`}
                onClick={() => handleSelect("vaccineNo", item)}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Smoking Status */}
      <div className={styles.filterGroup}>
        <p className={styles.filterLabel}>Smoking Status</p>
        <div className={styles.filterOptions}>
          {["All", "Yes", "No"].map((item) => (
            <button
              key={item}
              className={`${styles.filterButton} ${
                selected.smoking === item ? styles.active : ""
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

      {/* Saved Data Sets */}
      <div className={styles.savedSection}>
        <h3 className={styles.savedTitle}>Saved Data Sets</h3>
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className={styles.savedItem}>
            <input type="checkbox" />
            <p>Data Set Name</p>
            <p>Saved Active Data</p>
            <button className={styles.deleteButton}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSelector;
