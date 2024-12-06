// pages/_app.js
import '../styles/globals.css';  // Import global CSS here
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  <ToastContainer />
  return <Component {...pageProps} />;
}

export default MyApp;
