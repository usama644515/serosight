/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import styles from "./Slider.module.css";

const reportData = [
  {
    title: "Immunization Report",
    status: "COMPLETED",
    disease: "Dengue",
    date: "Submitted | 3/12/2024",
  },
  {
    title: "Immunization Report",
    status: "PENDING",
    disease: "Malaria",
    date: "Submitted | 9/26/2024",
  },
  {
    title: "Immunization Report",
    status: "PENDING",
    disease: "Malaria",
    date: "Submitted | 9/26/2024",
  },
];

export default function Slider() {
  const sliderRef = useRef(null);

  const handlePrev = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleNext = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quick Select</h2>

      <div className={styles.sliderWrapper}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={handlePrev}
        >
          &#8249;
        </button>
        <div className={styles.slider} ref={sliderRef}>
          {reportData.map((report, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{report.title}</h3>
              <h2 className={styles.cardstatus}>{report.status}</h2>
              <div className={styles.statusIcon}>
                {report.status === "COMPLETED" ? (
                  <img
                    src="/images/done.png"
                    alt="Completed"
                    className={styles.completedIcon}
                  />
                ) : (
                  <div className={styles.pendingIcons}>
                    <img
                      src="/images/dot1.png"
                      alt="Pending"
                      className={styles.pendingDot}
                    />
                    <img
                      src="/images/dot2.png"
                      alt="Pending"
                      className={styles.pendingDot}
                    />
                    <img
                      src="/images/dot3.png"
                      alt="Pending"
                      className={styles.pendingDot}
                    />
                  </div>
                )}
              </div>
              <p className={styles.disease}>{report.disease}</p>
              {report.status === "COMPLETED" ? (
                <p className={styles.viewReport}>View Your Report</p>
              ) : (
                <p className={styles.timetaken}>
                  Results take 1-2 weeks to process
                </p>
              )}
              <p className={styles.date}>{report.date}</p>
            </div>
          ))}
        </div>
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={handleNext}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
