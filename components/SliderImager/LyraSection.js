/* eslint-disable @next/next/no-img-element */
import styles from "./LyraSection.module.css";
import { useRouter } from "next/router";

export default function LyraSection() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/shop");
  };
  return (
    <section className={styles.container}>
      {/* <div className={styles.header}>
        <h1>
          The <span className={styles.highlight}>LYRA</span> speed is unmatched
          at 10 seconds per scan.
        </h1>
        <p>10 to 100 times faster than competitor scanners</p>
      </div> */}
      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.contents}>
            <h2>Sustainable</h2>
            <p>
              Extensive use of additive manufacturing to reduce CO2 footprint.
              Low power consumption.
            </p>
          </div>
          <img
            src="/images/lyra2.png" /* Replace with actual image path */
            alt="Sustainable"
            className={styles.image}
          />
        </div>
        <div className={styles.feature}>
          <img
            src="/images/lyra1.png" /* Replace with actual image path */
            alt="Precision"
            className={styles.image}
          />
          <div className={styles.contents}>
            <h2>Precision</h2>
            <p>
              Fine automatic focus adjustment ensures the sharpest possible
              images in all channels.
            </p>
          </div>
        </div>
      </div>
      {/* innerBox */}

      <div className={styles.content}>
        <div className={styles.item}>
          <h3 className={styles.name}>Future Proof</h3>
          <p className={styles.description}>
            Significantly lower initial and operating costs compared to
            conventional scanners.
          </p>
          <img src="/images/lyrabox.png" alt="" className={styles.person} />
        </div>
        <div className={styles.item}>
          <h3 className={styles.name}>Ultrafast Scan Times</h3>
          <p className={styles.description}>
            Image entire slides in a few seconds, that’s 10-100 times faster
            than conventional point-based scanners.
          </p>
          <img src="/images/lyrabox.png" alt="" className={styles.person} />
        </div>
        <div className={styles.item}>
          <h3 className={styles.name}>Leverage Novel Fluorophores</h3>
          <p className={styles.description}>
            Compatible with a wide range of state-of-the-art and novel
            fluorophores including state-of-the-art organic dyes and quantum
            dots. Maintains compatibility with standard dyes.
          </p>
          <img src="/images/lyrabox.png" alt="" className={styles.person} />
        </div>
      </div>
      <div className={styles.header2}>
        <h1>
        Conserve lab space as the <span className={styles.highlight2}>LYRA</span> fits within footprint of a sheet of paper.
        </h1>
        <button onClick={handleClick} className={styles.heroButton}>Pre-Order</button>
      </div>
    </section>
  );
}
