import Cart from "../../models/Cart";
import connectDb from "../../lib/dbConnect";

// Connect to the database
connectDb();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, bundleName, items, bundlePrice } = req.body;

      if (
        !userId ||
        !bundleName ||
        !items ||
        items.length === 0 ||
        !bundlePrice
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Ensure bundlePrice is a string
      const priceString = String(bundlePrice); // Make sure the price is a string
      console.log("Bundle Price as String:", priceString);  // Log for debugging

      // Check if the cart already exists for the user
      const existingCart = await Cart.findOne({ userId });

      if (existingCart) {
        // Overwrite the existing cart with the new bundle and items
        existingCart.bundleName = bundleName;
        existingCart.items = items;
        existingCart.bundlePrice = priceString; // Use the string price
        await existingCart.save();
      } else {
        // Create a new cart if none exists
        const newCart = new Cart({
          userId,
          bundleName,
          bundlePrice: priceString, // Use the string price here
          items,
        });
        await newCart.save();
      }

      return res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
      console.error("Error updating cart:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      return res.status(200).json({ cart });
    } catch (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Delete the user's cart
      const result = await Cart.deleteOne({ userId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Cart not found" });
      }

      return res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      console.error("Error deleting cart:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
