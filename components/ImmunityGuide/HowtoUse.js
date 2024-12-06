/* eslint-disable @next/next/no-img-element */
import styles from "./HowtoUse.module.css";

export default function HowtoUse() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>HOW TO USE</h2>
      <div className={styles.content}>
        <div className={styles.item}>
          <h3 className={styles.name}>Choose a Package</h3>
          <p className={styles.description}>
            Long-Term Immunity Monitoring Package allows you to track your
            immune health over time to help maintain and improve your immunity.
            The Short-Term Diagnostic Package offers a one-time test to check
            your current immunity levels.
          </p>
        </div>
        <div className={styles.item}>
          <h3 className={styles.name}>Choose a Category</h3>
          <p className={styles.description}>
            Depending on the category you select, you can test for a variety of
            illnesses and diseases that concern you. By targeting multiple
            strands within your immune system, these tests help you monitor and
            protect against a broader range of potential health risks.
          </p>
        </div>
        <div className={styles.item}>
          <h3 className={styles.name}>Find your Strand</h3>
          <p className={styles.description}>
            By selecting a category that covers the immune strand you’re most
            concerned about, you’ll receive the most helpful insights, giving
            you a tailored view of your immunity and enabling you to take the
            right steps to protect your health.
          </p>
        </div>
      </div>
    </section>
  );
}
