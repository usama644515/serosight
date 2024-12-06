/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/array-report');
  };
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>
          <span>Hi, Tim.</span> <br />
          Welcome to your Dashboard
        </h2>
        <p>
          View your immunity levels in comparison to the general population,
          view orders in progress, review past orders, and adjust your account
          settings all in one place.
        </p>
        <button onClick={handleClick} className={styles.heroButton}>Recent Report</button>
      </div>
      <div className={styles.imageContainer}>
      </div>
    </section>
  );
};

export default Hero;
