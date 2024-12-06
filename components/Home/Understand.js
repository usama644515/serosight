/* eslint-disable @next/next/no-img-element */
import styles from "./Understand.module.css";

const Understand = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h2>UNDERSTANDING HEALTH RISKS</h2>
                <p>
                    No immunity measure can tell you your current health or perfectly predict your susceptibility to disease. Our test can shine a light on how your immunity tracks over time and what your relative vulnerability might be.
                </p>
                {/* <button className={styles.heroButton}>Learn More</button> */}
            </div>

            <img src="/images/understand.webp" alt="" className={styles.heroImage} />
        </section>
    );
};

export default Understand;
