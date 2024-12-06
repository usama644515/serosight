/* eslint-disable @next/next/no-img-element */
import styles from "./Overview.module.css";
import CustomGraph from "./CustomGraph";

const Hero = () => {
  return (
    <section className={styles.overview}>
      <h2 className={styles.heading}>Your Immunity Overview</h2>
      <div className={styles.content}>
        <CustomGraph />
        <div className={styles.summary}>
          <h2>Summary</h2>
          <h3>Learn how your immunity levels compare to the general population</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            praesentium voluptatibus ad iure. Nemo vel atque incidunt
            voluptatibus ipsa tempora?
          </p>
          <div className={styles.linebox}>
            <div className={styles.summaryline}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
