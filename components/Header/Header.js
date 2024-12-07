/* eslint-disable @next/next/no-img-element */
import styles from "./Header.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import SignInModal from "../Modals/SignInModal";
import LogoutModal from "../Modals/LogoutModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isModalOpen, setIsModalOpen] = useState(false); // Sign-In Modal state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User authentication state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Logout Modal state
  const [userProfile, setUserProfile] = useState(null); // User profile data

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserProfile(user);
    setIsModalOpen(false); // Close modal after login
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(true); // Show logout modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setDropdownOpen(false);
    setIsLogoutModalOpen(false); // Close modal
    localStorage.removeItem("token"); // Clear token

    // Show a success toast notification
    toast.success("You have logged out successfully.", {
      position: "top-right", // Use a string for the position
      autoClose: 3000,
    });
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false); // Close modal without logging out
  };

  const openModal = () => {
    setIsModalOpen(true); // Open sign-in modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close sign-in modal
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);

    // Check if user is already logged in when the component mounts
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Replace with actual data retrieval logic as needed
      setUserProfile({ name: "John Doe", email: "john.doe@example.com", picture: "/images/user-icon.png" });
    }
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/logo.jpg" alt="Logo" className={styles.logoImg} />
          </Link>
        </div>
        <nav>
          <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ""}`}>
            <li>
              <Link
                href="/"
                className={activeLink === "/" ? styles.active : ""}
                onClick={() => handleLinkClick("/")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className={activeLink === "/shop" ? styles.active : ""}
                onClick={() => handleLinkClick("/shop")}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={activeLink === "/about-us" ? styles.active : ""}
                onClick={() => handleLinkClick("/about-us")}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/how-it-works"
                className={activeLink === "/how-it-works" ? styles.active : ""}
                onClick={() => handleLinkClick("/how-it-works")}
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/immunity-guides"
                className={activeLink === "/immunity-guides" ? styles.active : ""}
                onClick={() => handleLinkClick("/immunity-guides")}
              >
                Immunity Guide
              </Link>
            </li>
            <li>
              <Link
                href="/slider-imager"
                className={activeLink === "/slider-imager" ? styles.active : ""}
                onClick={() => handleLinkClick("/slider-imager")}
              >
                Slider Imager
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.rightSection}>
          {isLoggedIn ? (
            <div className={styles.profileContainer}>
              <img
                src={"/images/user-icon.png"}
                alt="Profile"
                className={styles.profileImage}
              />
              <button
                className={styles.dropdownButton}
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <img
                  src="/images/arrow-down.png"
                  alt="arrow down"
                  className={styles.dropdownicon}
                />
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/dashboard" className={styles.dropdownItem}>
                    Dashboard
                  </Link>
                  <Link href="/profile" className={styles.dropdownItem}>
                    Profile
                  </Link>
                  <Link
                    href=""
                    className={styles.dropdownItem}
                    onClick={confirmLogout}
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <button className={styles.signIn} onClick={openModal}>
              Sign In
            </button>
          )}

          <Link href="/payment-method" className={styles.cartLink}>
            <img src="/images/cart.svg" alt="Cart" className={styles.cartIcon} />
          </Link>
        </div>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Sign-In Modal */}
        <SignInModal isOpen={isModalOpen} onRequestClose={closeModal} onLogin={handleLogin} />

        {/* Logout Modal */}
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onRequestClose={closeLogoutModal}
          onConfirm={handleLogout}
        />
      </header>

      {/* ToastContainer outside the header */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />
    </>
  );
};

export default Header;
