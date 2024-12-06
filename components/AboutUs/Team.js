/* eslint-disable @next/next/no-img-element */
import styles from "./Team.module.css";

export default function Team() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Meet Our Team</h2>
      <div className={styles.content}>
        <div className={styles.item}>
          <img src="/images/t1.webp" alt="Tim Leehealey" className={styles.person} />
          <h3 className={styles.name}>TIM LEEHEALEY</h3>
          <p className={styles.position}>CEO</p>
          <p className={styles.description}>
            Mr. Timothy Leehealey is a former tech executive and investor.
            Starting his career at JP Morgan he spent 6 years in banking before
            transitioning to small company tech. Mr Leehealey served in
            executive roles at several companies including chief
            marketing/business development officer at Guidance Software, which
            he helped take public, and CEO of Accessdata which he successfully
            sold for 130 million. He was also instrumental as an investor in the
            creation of Carbon Black, Netwitness, and Streampc.
          </p>
        </div>
        <div className={styles.item}>
          <img src="/images/t2.webp" alt="Austin Leehealey" className={styles.person} />
          <h3 className={styles.name}>Austin LEEHEALEY</h3>
          <p className={styles.position}>CSO</p>
          <p className={styles.description}>
            I am a software engineer with a diverse background of developing
            experience in web applications, data science, Artificial
            Intelligence, and robotics software. As the CTO of Serosight I aim
            to produce consumer-friendly applications, supported by robust cloud
            pipelines, to create a seamless health monitoring experience.
          </p>
        </div>
        <div className={styles.item}>
          <img src="/images/t3.webp" alt="Dr. Christine Leehealey" className={styles.person} />
          <h3 className={styles.name}>DR. CHRISTINE LEEHEALEY</h3>
          <p className={styles.position}>CTO</p>
          <p className={styles.description}>
            Dr. Christine J. Leehealey is a rheumatologist in Irvine, California
            and is affiliated with Hoag Memorial Hospital Presbyterian. She
            received her medical degree from New York Medical College and has
            been in practice for more than 25 years. Dr. Christine J. Leehealey
            has expertise in treating rheumatoid arthritis, among other conditions.
            She is the founder of Cooking Points for Healthy Joints, a non-profit
            focused on promoting food and lifestyle choices that help manage
            rheumatological conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
