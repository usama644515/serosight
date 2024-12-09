/* eslint-disable @next/next/no-img-element */
import styles from "./AboutUs.module.css";
import { useRouter } from "next/router";

const AboutUs = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about-us");
  };
  return (
    <section className={styles.hero}>
      <img src="/images/aboutus.jpg" alt="About Us" className={styles.heroImage} />
      <div className={styles.content}>
        <h2>ABOUT US</h2>
        <p>
          ImmunoMap is owned by Serosight, a company dedicated to empowering
          customers by offering them individualized health options. <br />
          <br />
          Let us help you live healthier.
        </p>
        <button onClick={handleClick} className={styles.heroButton}>Learn More</button>
      </div>
    </section>
  );
};

export default AboutUs;
