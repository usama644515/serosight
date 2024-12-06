import styles from "./LogoutModal.module.css";

const LogoutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes, Log Out
          </button>
          <button className={styles.cancelButton} onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
