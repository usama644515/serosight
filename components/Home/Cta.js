/* eslint-disable @next/next/no-img-element */
import styles from "./Cta.module.css";
import { useRouter } from "next/router";

const Cta = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/shop");
  };
  return (
    <section className={styles.process}>
      <div className={styles.content}>
        <h2 className={styles.title}>Ready to Find Your Test?</h2>
        <p>
          View our shop to see all our avaible testing options and find the best
          testing kit for you!
        </p>
        <button onClick={handleClick} className={styles.heroButton}>
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Cta;
