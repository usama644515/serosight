/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/array-report");
  };
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>Welcome</h2>
        <p>Select the data you would like to create.</p>
        <div className="btns">
          <button onClick={handleClick} className={styles.heroButton}>COMPARISION</button>
          <button onClick={handleClick} className={styles.heroButton}>
            PATIENT
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
