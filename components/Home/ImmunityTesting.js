import styles from "./ImmunityTesting.module.css";

const ImmunityTesting = () => {
  return (
    <section className={styles.immunityTesting}>
      <h2 className={styles.title}>IMMUNITY TESTING YOU CAN TRUST</h2>
      <div className={styles.content}>
        {/* Column 1 */}
        <div className={styles.column}>
          <div className={styles.items}>
            <div className={styles.circle}>1</div>
            <h5>Experts in microarray technology for 20+ years</h5>
            <p>
              Serosight was founded by pioneers in the field of microarray blood
              testing. With over 20 years of lab research, numerous published papers, 
              2 patents, and countless tests under our belts, there is no one 
              better to trust with your immunity testing.
            </p>
          </div>
          <div className={styles.items}>
            <div className={styles.circle}>2</div>
            <h5>Viruses Scanned For</h5>
            <p>
              We can check your blood sample against a multitude of known viruses 
              and variants and measure your immunity levels against them.
            </p>
          </div>
        </div>

        {/* Image Column */}
        <div className={styles.imageWrapper}>
          <img
            src="/images/immunity.jpeg"
            alt="Immunity Testing"
            className={styles.immunityImage}
          />
        </div>

        {/* Column 2 */}
        <div className={styles.column}>
          <div className={styles.items}>
            <div className={styles.circle}>3</div>
            <h5>Diagnostics and Monitoring</h5>
            <p>
              Serosight offers both diagnostic tests and ongoing monitoring. 
              Whether you need a snapshot of your current immunity for a specific health concern 
              or want to track your immunity over time, we have options to suit your needs.
            </p>
          </div>
          <div className={styles.items}>
            <div className={styles.circle}>4</div>
            <h5>No Hidden Agenda</h5>
            <p>
              Serosight is an independent testing company focused on empowering 
              customers with knowledge to make informed decisions for their health 
              and well-being without upselling products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmunityTesting;
