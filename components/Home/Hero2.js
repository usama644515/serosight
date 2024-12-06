/* eslint-disable @next/next/no-img-element */
import styles from "./Hero2.module.css";
import { useRouter } from 'next/router';

const Hero2 = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/shop');
  };
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>
          <span>IMMUNOMAP</span> <br />
          Immunity Testing
        </h2>
        <h3>by SeroSight</h3>
        <p>
          Take charge of your immunity with our blood testing technology and
          diagnostics. <br /> <br /> <span>Find the right test for you.</span>
        </p>
        <button onClick={handleClick} className={styles.heroButton}>Shop Now</button>
      </div>
      <div className={styles.imageContainer}>
      </div>
    </section>
  );
};

export default Hero2;
