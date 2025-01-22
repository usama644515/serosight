/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Hero.module.css";

const Hero = () => {
  const [userName, setUserName] = useState("....."); 
  const router = useRouter();

  useEffect(() => {
    // Retrieve the name from localStorage
    const storedName = localStorage.getItem("name");
    console.log(storedName);
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleClick = () => {
    router.push("/array-report");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2>
          <span>Hi, {userName}.</span> <br />
          Welcome to your Dashboard
        </h2>
        <p>
          View your immunity levels in comparison to the general population,
          view orders in progress, review past orders, and adjust your account
          settings all in one place.
        </p>
        <button onClick={handleClick} className={styles.heroButton}>
          Recent Report
        </button>
      </div>
      <div className={styles.imageContainer}></div>
    </section>
  );
};

export default Hero;
