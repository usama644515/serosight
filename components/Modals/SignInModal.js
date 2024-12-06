/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toast
import "react-toastify/dist/ReactToastify.css"; // Importing toast CSS
import styles from "./SignInModal.module.css";
import SignUpModal from "../Modals/SignUpModal";

const SignInModal = ({ isOpen, onRequestClose, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await axios.post("http://localhost:5001/api/login", {
      const response = await axios.post("http://13.60.25.158:5001/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Store token in local storage
        localStorage.setItem("token", token);

        // Show success toast
        toast.success("Login successful!");

        // Notify parent component of successful login
        onLogin();

        // Clear form and close modal
        setEmail("");
        setPassword("");
        setKeepMeLoggedIn(false);
        onRequestClose();
      }
    } catch (error) {
      // Show error toast
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Invalid credentials");
      } else {
        toast.error("Network error, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordLoading(true);

    try {
      // const response = await axios.post("http://localhost:5001/api/forgot-password", {
      const response = await axios.post("http://13.60.25.158:5001/api/forgot-password", {
        email: forgotPasswordEmail,
      });

      if (response.status === 200) {
        toast.success("Password reset link sent to your email!");
        setForgotPasswordEmail("");
        setIsForgotPasswordModalOpen(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error sending reset link");
      } else {
        toast.error("Network error, please try again later.");
      }
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onRequestClose}>
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalInner}>
            <div className={styles.modalLeft}>
              <img
                src="/images/login-image.png"
                alt="Login Image"
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalRight}>
              <h2 className={styles.modalTitle}>Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <div className={styles.emailWrapper}>
                    <input
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
                  <label>Password</label>
                  <div className={styles.passwordWrapper}>
                    <input
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
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    checked={keepMeLoggedIn}
                    onChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
                  />
                  <label>Keep me logged in</label>
                </div>
                <button type="submit" className={styles.loginBtn}>
                  {loading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <div className={styles.forgotPassword}>
                <a onClick={openForgotPasswordModal}>Forgot Password?</a>
              </div>
              <div className={styles.signup}>
                <p>
                  Don’t have an account?{" "}
                  <span onClick={openSignUpModal}>Sign Up</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignUpModal isOpen={isSignUpModalOpen} onRequestClose={closeSignUpModal} />

      {/* Forgot Password Modal */}
      {isForgotPasswordModalOpen && (
        <div className={styles.overlay} onClick={closeForgotPasswordModal}>
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${styles.modalInner} ${styles.forgotPasswordModal}`}>
              <h2 className={styles.modalTitle}>Forgot Password</h2>
              <form onSubmit={handleForgotPassword}>
                <div className={`${styles.inputGroup} ${styles.forgotPasswordInput}`}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={styles.inputField}
                  />
                </div>
                <button type="submit" className={styles.forgotPasswordBtn}>
                  {forgotPasswordLoading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
