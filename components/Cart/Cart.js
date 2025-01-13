import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Cart.module.css";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [bundleName, setBundleName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false); // Payment loading state initialization

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await fetch(`/api/cart?userId=${userId}`);
        if (res.status === 404) {
          setCartItems([]);
          setBundleName("");
          setTotalPrice(0);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        if (data.cart && Array.isArray(data.cart.items)) {
          setCartItems(data.cart.items);
          setBundleName(data.cart.bundleName || "Default Bundle");
          setTotalPrice(parseFloat(data.cart.bundlePrice)); // Directly using the bundle price
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemIndex) => {
    try {
      const userId = localStorage.getItem("userId");
      const updatedItems = cartItems.filter((_, index) => index !== itemIndex);

      const res = await fetch(`/api/cart`, {
        method: "POST",
        body: JSON.stringify({
          userId,
          bundleName,
          items: updatedItems,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setCartItems(updatedItems);
        // Recalculate totalPrice based on updated cartItems if needed
        // You can also handle total price logic here based on your requirement.
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBundle = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`/api/cart?userId=${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setCartItems([]);
        setBundleName("");
        setTotalPrice(0);
      } else {
        throw new Error("Failed to delete bundle");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    localStorage.setItem("bundleName", bundleName);
    setPaymentLoading(true); // Set loading state to true when checkout starts

    try {
      const userId = localStorage.getItem("userId");
      // Save cartItems in localStorage for later use
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          userId,
          totalAmount: totalPrice, // Send totalPrice directly
          cartItems: cartItems,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 400 && data.error) {
        // Redirect the user to the profile page
        toast.error("Please add your billing or shipping address!");
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to start payment process");
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe(); // Assuming `getStripe` is your Stripe.js load function
      const { sessionId } = data;
      const result = await stripe.redirectToCheckout({ sessionId });

      // Check for successful payment
      if (result.error) {
        toast.error(result.error.message); // Handle payment failure error
      } else {
        // Redirect to success page after successful payment
        toast.success("Order placed successfully!");
        router.push("/order-success"); // Redirect to your success page after payment
      }
    } catch (err) {
      setError(err.message || "Failed to start payment process");
    } finally {
      setPaymentLoading(false); // Set loading state to false when the checkout process is complete
    }
  };

  if (loading) return <p className={styles.loading}>Loading cart...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.cartContainer}>
      <Box className={styles.bundleHeader}>
        <Typography variant="h4" className={styles.cartHeading}>
          Cart
        </Typography>
        {cartItems.length > 0 && (
          <IconButton
            edge="end"
            color="secondary"
            onClick={deleteBundle}
            className={styles.bundleDeleteButton}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="h6" className={styles.bundleName}>
        Bundle Name: {bundleName || "No Bundle"}
      </Typography>

      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <>
          <List className={styles.cartList}>
            {cartItems.map((item, index) => (
              <ListItem key={index} className={styles.cartItem}>
                <ListItemText
                  primary={
                    <Typography className={styles.itemName}>
                      {item.testName}
                    </Typography>
                  }
                  className={styles.cartItemLeft}
                />
              </ListItem>
            ))}
          </List>

          <Divider className={styles.divider} />

          <Box className={styles.totalSection}>
            <Typography variant="h6" className={styles.totalText}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Box className={styles.checkoutSection}>
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              className={styles.checkoutButton}
              disabled={paymentLoading}
            >
              {paymentLoading ? "Processing Payment..." : "Proceed to Checkout"}
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}

async function getStripe() {
  return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}
