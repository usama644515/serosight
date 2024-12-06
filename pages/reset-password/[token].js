import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import styles from './reset-password.module.css'; // Import styles

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query; // Access token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify the token validity by making a request to the backend
      const verifyToken = async () => {
        try {
          // const response = await axios.get(`http://localhost:5001/api/verify-reset-token/${token}`);
          const response = await axios.get(`http://13.60.25.158:5001/api/verify-reset-token/${token}`);
          if (response.status === 200) {
            setIsTokenValid(true);  // Token is valid
          }
        } catch (error) {
          setIsTokenValid(false);  // Token is invalid or expired
        }
      };
      
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
        // const response = await axios.post(`http://localhost:5001/api/reset-password/${token}`, {
        const response = await axios.post(`http://13.60.25.158:5001/api/reset-password/${token}`, {
            password: newPassword,  // Send 'newPassword' as 'password' in the body
          });
          

      if (response.status === 200) {
        router.push("/"); // Redirect to login page after success
        toast.success("Password reset successfully!");
        // setTimeout(() => {
          
        // }, 2000);
      }
    } catch (error) {
      console.error("Error during password reset:", error); // Log error details for debugging

      if (error.response) {
        // If the error comes from backend (with a response)
        setErrorMessage(error.response.data.message || "Error resetting password, please try again.");
        toast.error(error.response.data.message || "Error resetting password, please try again.");
      } else if (error.request) {
        // If there's an issue with the request
        setErrorMessage("Request failed. Please check your network connection.");
        toast.error("Request failed. Please check your network connection.");
      } else {
        // If there is another type of error
        setErrorMessage("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>Reset Your Password</h1>

        {/* Show error message if token is invalid or expired */}
        {!isTokenValid && <p className={styles.error}>Invalid or expired token.</p>}
        
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        
        {/* If the token is valid, show the reset password form */}
        {isTokenValid && (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter your new password"
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
                placeholder="Confirm your new password"
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
