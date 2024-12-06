/* eslint-disable @next/next/no-img-element */
import styles from "./Result.module.css";

const Result = () => {
    return (
        <section className={styles.hero}>
            <img src="/images/result.webp" alt="" className={styles.heroImage} />
            <div className={styles.content}>
                <h2>THE RESULTS</h2>
                <p>
                    Once you get your results, you can use this knowledge to consult your doctor and provide more proactive care for your health. This information can be used to create a personalized healthcare regimen to ensure you stay as protected and healthy as you can be.
                </p>
                {/* <button className={styles.heroButton}>Learn More</button> */}
            </div>
        </section>
    );
};

export default Result;
