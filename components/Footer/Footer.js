/* eslint-disable @next/next/no-img-element */
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Branding Section */}
        <div className={styles.footerBranding}>
          <img
            src="/images/logo.jpg"
            alt="Brand Logo"
            className={styles.logo}
          />
          <p className={styles.description}>
            Take control of your health with our cutting-edge blood testing
            technology and diagnostics.
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon} title="Facebook">
              <img src="/images/facebook.png" alt="Facebook" />
            </a>
            <a href="#" className={styles.socialIcon} title="Instagram">
              <img src="/images/instagram.png" alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerLinks}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul>
            {[
              "Home",
              "Shop",
              "About Us",
              "Immunity Guide",
              "How it Works",
              "Slider Imager",
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={
                    index == 0
                      ? "/"
                      : index == 1
                      ? "/shop"
                      : index == 2
                      ? "/about-us"
                      : index == 3
                      ? "/immunity-guides"
                      : index == 4
                      ? "/how-it-works"
                      : "/slider-imager"
                  }
                  className={styles.link}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className={styles.footerContact}>
          <h3 className={styles.sectionTitle}>Contact Us</h3>
          <p className={styles.contactItem}>
            <strong>Location:</strong> Irvine, California
          </p>
          <p className={styles.contactItem}>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@mysite.com" className={styles.contactLink}>
              contact@mysite.com
            </a>
          </p>
          <p className={styles.contactItem}>
            <strong>Phone:</strong>{" "}
            <a href="tel:1234567890" className={styles.contactLink}>
              123-456-7890
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>&copy; 2024 All Rights Reserved.</p>
      </div>
    </footer>
  );
}
