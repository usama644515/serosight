import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Cart.module.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);  // For delete confirmation dialog
  const [itemToDelete, setItemToDelete] = useState(null);  // Item to delete

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await fetch(`/api/cart?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        if (data && Array.isArray(data.items)) {
          setCartItems(data.items);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`/api/cart/update`, {
        method: 'PUT',
        body: JSON.stringify({ id, quantity: newQuantity }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
      } else {
        throw new Error('Failed to update item quantity');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`/api/cart/remove`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setCartItems(cartItems.filter(item => item.id !== id));
        setDialogOpen(false);  // Close dialog after delete
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = () => {
    // Checkout logic goes here
  };

  if (loading) return <p className={styles.loading}>Loading cart...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.cartContainer}>
      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <List className={styles.cartList}>
          {cartItems.map((item) => (
            <ListItem key={item.id} className={styles.cartItem}>
              <ListItemAvatar>
                <Avatar variant="square" alt={item.name} src={item.image} className={styles.cartImage} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.price} | Quantity: ${item.quantity}`}
              />
              <Box className={styles.actions}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => { setItemToDelete(item.id); setDialogOpen(true); }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {cartItems.length > 0 && (
        <Box className={styles.checkoutSection}>
          <Button
            variant="contained"
            color="primary"
            className={styles.checkoutButton}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}

      {/* Confirmation Dialog for Deleting Item */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this item from the cart?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => removeFromCart(itemToDelete)} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
