import styles from './VaccineChart.module.css';

const VaccineChart = () => {
  const charts = [
    {
      percentage: 81,
      label: "lost CURRENT immunity after 6 months",
    },
    {
      percentage: 45,
      label: "lost CURRENT immunity after 2 months",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Left Text Section */}
      <div className={styles.textSection}>
        <h2>Recommended Vaccine Amount</h2>
        <h3>based on your comprehensive immunity results</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Right Circular Charts Section */}
      <div className={styles.chartSection}>
        <div className={styles.chartContainer}>
          {charts.map((chart, index) => (
            <div className={styles.circle} key={index}>
              <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path
                  className={styles.circleBackground}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={styles.circleProgress}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{
                    strokeDasharray: `${chart.percentage}, 100`,
                  }}
                />
              </svg>
              <div className={styles.percentageText}>
                <span>{chart.percentage}%</span>
                <p>{chart.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaccineChart;
