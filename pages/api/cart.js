import Cart from "../../models/Cart";
import connectToDatabase from "../../lib/dbConnect"; // Make sure to connect to your DB

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    // Add new item to the cart
    try {
      const { userId, testName, price, quantity = 1 } = req.body;

      // Find the cart for the user
      let cart = await Cart.findOne({ userId });

      if (cart) {
        const existingItemIndex = cart.items.findIndex(item => item.testName === testName);
        if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          cart.items.push({ testName, price, quantity });
        }
        await cart.save();
      } else {
        cart = new Cart({ userId, items: [{ testName, price, quantity }] });
        await cart.save();
      }
      res.status(200).json({ message: "Added to Cart" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  }

  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      const cart = await Cart.findOne({ userId });

      if (cart) {
        res.status(200).json({ items: cart.items });
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve cart" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, quantity } = req.body;
      const cart = await Cart.findOne({ "items._id": id });

      if (cart) {
        const item = cart.items.find(item => item._id.toString() === id);
        if (item) {
          item.quantity = quantity;
          await cart.save();
          res.status(200).json({ message: "Cart updated" });
        } else {
          res.status(404).json({ error: "Item not found" });
        }
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const cart = await Cart.findOne({ "items._id": id });

      if (cart) {
        cart.items = cart.items.filter(item => item._id.toString() !== id);
        await cart.save();
        res.status(200).json({ message: "Item removed from cart" });
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  }
}
