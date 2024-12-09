/* eslint-disable @next/next/no-img-element */
import styles from "./Cta.module.css";
import Link from "next/link";

export default function Cta() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {/* Image Section */}
        <div className={styles.imageContainer}>
          <img
            src="/images/insights.jpg"
            alt="Health Insight"
            className={styles.image}
          />
        </div>

        {/* Text Section */}
        <div className={styles.textContainer}>
          <h3 className={styles.title}>Found Your Perfect Match?</h3>
          <p className={styles.description}>
            Purchase the test kit that will provide the most insgiht into your
            health concerns.
          </p>
          <Link href="/shop" className={styles.button}>
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
