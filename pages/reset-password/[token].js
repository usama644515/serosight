import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./reset-password.module.css";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.get(`/api/auth/verify-reset-token?token=${token}`);
          if (response.status === 200) {
            setIsTokenValid(true);
          }
        } catch (error) {
          setErrorMessage("Invalid or expired token");
          setIsTokenValid(false);
        }
      };
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, { password: newPassword });

      if (response.status === 200) {
        toast.success("Password reset successful! Redirecting...");
        router.push("/"); // Redirect to login page after success
        // toast.success("Password reset successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>Reset Password</h1>

        {!isTokenValid && errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {isTokenValid && (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className={styles.inputField}
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
