/* eslint-disable @next/next/no-img-element */
import styles from "./Hero.module.css";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/array-report");
  };
  const scrollToComparisons = () => {
    const ComparisonsSection = document.getElementById(
      "comparison-data-selector"
    );
    if (ComparisonsSection) {
      ComparisonsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToPatientSection = () => {
    const PatientSection = document.getElementById("patient-data-selector");
    if (PatientSection) {
      PatientSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>Welcome</h2>
        <p>Select the data you would like to create.</p>
        <div className="btns">
          <button onClick={scrollToComparisons} className={styles.heroButton}>
            COMPARISION
          </button>
          <button
            onClick={scrollToPatientSection}
            className={styles.heroButton}
          >
            PATIENT
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
