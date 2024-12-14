/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";
import styles from "./SignUpModal.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpModal = ({ isOpen, onRequestClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`; // Convert first name and last name to lowercase and concatenate
      const requestData = {
        username,
        email,
        password,
        firstName,
        lastName,
      };

      const response = await axios.post("/api/auth/signup", requestData);

      if (response.status === 201) {
        toast.success("Account created successfully!");
        // Clear form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        onRequestClose(); // Close modal on successful sign-up
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Network error, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onRequestClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalInner}>
          <div className={styles.modalLeft}>
            <img
              src="/images/login-image.png"
              alt="Login Illustration"
              className={styles.modalImage}
            />
          </div>
          <div className={styles.modalRight}>
            <h2 className={styles.modalTitle}>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <div className={styles.fieldsWrapper}>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <div className={styles.fieldsWrapper}>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <div className={styles.fieldsWrapper}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className={styles.inputField}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className={styles.passwordToggle}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <button type="submit" className={styles.loginBtn} disabled={loading}>
                {loading ? (
                  <div className={styles.spinner}></div> // Circular progress loader
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
