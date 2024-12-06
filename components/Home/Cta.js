/* eslint-disable @next/next/no-img-element */
import styles from "./Cta.module.css";

const Cta = () => {
    return (
        <section className={styles.process}>
            <div className={styles.content}>
                <h2 className={styles.title}>Ready to Find Your Test?</h2>
                <p>
                    View our shop to see all our avaible testing options and find the best  testing kit for you!
                </p>
                <button className={styles.heroButton}>Shop Now</button>
            </div>
        </section>
    );
};

export default Cta;
