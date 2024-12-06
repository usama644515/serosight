/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./HowitWorks.module.css";

const features = [
  {
    id: 1,
    title: "High Image Resolution",
    description: "Available with 7 µm or 10 µm pixel size.",
  },
  {
    id: 2,
    title: "Large Scan Area",
    description: "20 mm x 80 mm.",
  },
  {
    id: 3,
    title: "Connected",
    description: "Data can be transferred to cloud storage by Wi-Fi.",
  },
  {
    id: 4,
    title: "Cost Efficient",
    description:
      "Significantly lower initial and operating costs compared to conventional scanners.",
  },
];

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>How It Works</h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src="/images/scanner.png"
            alt="Scanner"
            className={styles.image}
          />
        </div>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`${styles.featureBox} ${
                (index === 1 || index === 2) && styles.shiftRight
              }`}
            >
              <div className={styles.circle}>{feature.id}</div>
              <div className={styles.text}>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
