/* eslint-disable @next/next/no-img-element */
import styles from './AccountSettings.module.css';

export default function AccountSettings() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Settings</h1>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.name}>John Doe Doedo</h2>
            <p className={styles.email}>johndoe@gmail.com</p>
          </div>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <img src="/images/birthday.png" alt="Birthday" className={styles.icon} />
            <div>
              <p>Birthday</p>
              <span>02/05/2003</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <img src="/images/weight.png" alt="Weight" className={styles.icon} />
            <div>
              <p>Weight</p>
              <span>110</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <img src="/images/height.png" alt="Height" className={styles.icon} />
            <div>
              <p>Height</p>
              <span>5 10</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <img src="/images/gender.png" alt="Gender" className={styles.icon} />
            <div>
              <p>Gender</p>
              <span>Male</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <img src="/images/age.png" alt="Age" className={styles.icon} />
            <div>
              <p>Age</p>
              <span>40</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <img src="/images/pronouns.png" alt="Pronouns" className={styles.icon} />
            <div>
              <p>Pronouns</p>
              <span>he/him</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
