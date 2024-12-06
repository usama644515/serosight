import styles from './InfoCards.module.css';

const InfoCards = () => {
  return (
    <div className={styles.container}>
      {/* About Section */}
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <h2>About</h2>
          <p>Learn about the disease</p>
        </div>
        <div className={styles.cardWrapper}>
          <div className={styles.verticalLine}>
            <div className={styles.marker}></div>
          </div>
          <div className={styles.card}>
            <h3>Commonality</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <div className={styles.percentage}>97%</div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <h2>Summary</h2>
          <p>In-depth summary of your results</p>
        </div>
        <div className={styles.cardWrapper}>
          <div className={styles.verticalLine}>
            <div className={styles.marker}></div>
          </div>
          <div className={styles.card}>
            <h3>Average Immunity</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className={styles.percentage}>53%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
