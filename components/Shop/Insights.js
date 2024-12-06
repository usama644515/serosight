/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styles from "./Insights.module.css";
import Link from "next/link";

export default function Insights() {
  return (
    <section className={styles.container}>
      {/* <h2 className={styles.heading}>Health Insight Packages</h2> */}
      <div className={styles.content}>
        {/* Image Section */}
        <div className={styles.imageContainer}>
          <img
            src="/images/insights2.png"
            alt="Health Insight"
            className={styles.image}
          />
        </div>

        {/* Text Section */}
        <div className={styles.textContainer}>
          <h3 className={styles.title}>
            <span>Learn About</span> <br /> THE LYRA IMAGER
          </h3>
          <p className={styles.description}>
            The LYRA is the fastest, most accurate, and most customizable
            microarray imager available.
          </p>
          <Link href="/slider-imager" className={styles.button}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
