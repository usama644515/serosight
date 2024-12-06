/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styles from './ProfileTile.module.css';

export default function ProfileTile() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/card2.png" 
            alt="Payment Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Payment Methods</h3>
          <p className={styles.subtitle}>change your language settings</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/clock.png" // Replace with your image file
            alt="Order Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Order History</h3>
          <p className={styles.subtitle}>View your past and pending orders</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/home.png" // Replace with your image file
            alt="Shipping Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Shipping Addresses</h3>
          <p className={styles.subtitle}>change your shipping settings</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/unlock.png" // Replace with your image file
            alt="Activation Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Activation Code</h3>
          <p className={styles.subtitle}>link a test kit to your account</p>
        </div>
      </div>
      <h1 className={styles.title2}>General Settings</h1>
      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/settings.png" 
            alt="Payment Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Profile Settings</h3>
          <p className={styles.subtitle}>update your profile information</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/privacy.png" // Replace with your image file
            alt="Order Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Privacy</h3>
          <p className={styles.subtitle}>update your account passwords</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/bell.png" // Replace with your image file
            alt="Shipping Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Notifications</h3>
          <p className={styles.subtitle}>adjust your notification settings</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <img
          className='iconImage'
            src="/images/chat.png" // Replace with your image file
            alt="Activation Icon"
          />
        </div>
        <div>
          <h3 className={styles.title}>Language</h3>
          <p className={styles.subtitle}>change your language settings</p>
        </div>
      </div>
    </div>
  );
}
