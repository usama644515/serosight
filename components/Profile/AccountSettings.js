/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "./AccountSettings.module.css";

export default function AccountSettings() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email"); // Get email from local storage
    const userId = localStorage.getItem("userId"); // Get userId from local storage

    // If email exists, proceed to fetch user data
    if (email) {
      async function fetchUser() {
        try {
          // Fetch user data from the server using the email
          const res = await fetch(`/api/getUser?email=${email}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await res.json();

          // If user data is returned, store userId in localStorage (if not already stored)
          if (data.userId && !userId) {
            localStorage.setItem("userId", data.userId);
          }

          setUser(data); // Set the user data to state
        } catch (err) {
          setError(err.message);
        }
      }

      fetchUser();
    } else {
      setError("No email found in local storage");
    }
  }, []); // Only run once on mount

  // Calculate age from birthdate
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  // Determine pronouns based on gender
  const getPronouns = (gender) => {
    if (gender.toLowerCase() === "male") return "he/him";
    if (gender.toLowerCase() === "female") return "she/her";
    return "they/them";
  };

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div className={styles.shimmerContainer}></div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Settings</h1>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.name}>
              {user.firstName} {user.lastName}
            </h2>
            <p className={styles.email}>{user.email}</p>
          </div>
          <div className={styles.avatar}>
            <img src="/images/user-icon.png" alt="" />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <img
              src="/images/birthday.png"
              alt="Birthday"
              className={styles.icon}
            />
            <div>
              <p>Birthday</p>
              <span>{new Date(user.dob).toLocaleDateString()}</span>
            </div>
          </div>
          {/* <div className={styles.infoItem}>
            <img
              src="/images/weight.png"
              alt="Weight"
              className={styles.icon}
            />
            <div>
              <p>Weight</p>
              <span>{user.weight}</span>
            </div>
          </div> */}
          {/* <div className={styles.infoItem}>
            <img
              src="/images/height.png"
              alt="Height"
              className={styles.icon}
            />
            <div>
              <p>Height</p>
              <span>{user.height}</span>
            </div>
          </div> */}
          <div className={styles.infoItem}>
            <img
              src="/images/gender.png"
              alt="Gender"
              className={styles.icon}
            />
            <div>
              <p>Gender</p>
              <span>{user.gender}</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <img src="/images/age.png" alt="Age" className={styles.icon} />
            <div>
              <p>Age</p>
              <span>{calculateAge(user.dob)}</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <img
              src="/images/pronouns.png"
              alt="Pronouns"
              className={styles.icon}
            />
            <div>
              <p>Pronouns</p>
              <span>{getPronouns(user.gender)}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.rightAligned}>
        <button className={styles.button}>EDIT PROFILE</button>
    </div>
      </div>
    </div>
  );
}
