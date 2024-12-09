/* eslint-disable @next/next/no-img-element */
import styles from "./Hero2.module.css";
import { useRouter } from "next/router";

const Hero2 = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/shop");
  };
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>
          <span>The LYRA</span>
        </h2>
        <h3>First Generation Microarray Imaging.</h3>
        <p>Effortlessly image your microarrays with unprecedented speed.</p>
        <button onClick={handleClick} className={styles.heroButton}>Pre Order</button>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero2;
