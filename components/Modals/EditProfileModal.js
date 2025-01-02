import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EditProfileModal.module.css";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onRequestClose, user = {} }) => {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [loading, setLoading] = useState(false);

  // Fetch userId from local storage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      toast.error("User ID not found in local storage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put("/api/auth/edit-profile", {
        userId,
        firstName,
        lastName,
        dob,
        gender,
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        onRequestClose();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Try again later."
      );
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
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Gender</label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === "Other"}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    Other
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className={`${styles.submitBtn} ${
                  loading ? styles.loading : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.loader}></div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
