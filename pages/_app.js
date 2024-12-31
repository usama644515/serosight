// pages/_app.js
import "../styles/globals.css"; // Import global CSS here
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role"); // Retrieve role from localStorage

    if (role === "doctor" && router.pathname !== "/doctor-dashboard") {
      // Redirect to doctor-dashboard if not already there
      router.push("/doctor-dashboard");
    }
  }, [router]);

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
