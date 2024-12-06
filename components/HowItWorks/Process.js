/* eslint-disable @next/next/no-img-element */
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>The Process</h2>
      <h3 className={styles.subheading}>
        The SeroSight immunity test is a simple at-home test blood test.
        Discover how the process works and what you need to do below!
      </h3>
      <div className={styles.content}>
        <div className={styles.item}>
          <img src="/images/p1.png" alt="" className={styles.person} />
          <h3 className={styles.name}>Order a SeroSight Blood Test</h3>
          <p className={styles.description}>
            Once you order a test, we will mail you a blood spot collection kit
            complete with collection pad, extraction lance, bandaid, and return
            envelope
          </p>
        </div>
        <div className={styles.item}>
          <img src="/images/p2.png" alt="" className={styles.person} />
          <h3 className={styles.name}>Activate Your Test Kit</h3>
          <p className={styles.description}>
            To activate your test kit, visit www.????.com or download our mobile
            app (SeroSight), create an account, and enter the activation code on
            your test kit. Once completed you have a SeroSight account and can
            tract your immunity test results over time as well as simply manager
            your account and order additional test.
          </p>
        </div>
        <div className={styles.item}>
          <img src="/images/p3.png" alt="" className={styles.person} />
          <h3 className={styles.name}>Collect a Blood Sample</h3>
          <p className={styles.description}>
            Collecting a blood sample is simple, easy, and painless. Make a
            finger prick using the provided sterile lance, fill two blood spot
            markers, and fill in a few pieces of personal information. You can
            watch a short video or follow our simple instructions HERE.
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <img src="/images/p4.png" alt="" className={styles.person} />
          <h3 className={styles.name}>Mail The Sample Back to Us</h3>
          <p className={styles.description}>
            We include a pre-paid mailer for you to send the sample directly to
            our lab through United States Postal Service (USPS).
          </p>
        </div>
        <div className={styles.item}>
          <img src="/images/p5.png" alt="" className={styles.person} />
          <h3 className={styles.name}>Get Your Report</h3>
          <p className={styles.description}>
            We will email you as soon as your results are available online –
            within two weeks after we receive your sample. Use your account
            information (set up in Activate Your Test Kit) to view your report
            any time after it is ready.
          </p>
        </div>
      </div>
    </section>
  );
}
