import Cart from "../../models/Cart";
import connectDb from "../../lib/dbConnect";

connectDb();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, bundleName, items } = req.body;

      if (!userId || !bundleName || !items || items.length === 0) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create a new cart entry
      const newCart = new Cart({
        userId,
        bundleName,
        items,
      });

      await newCart.save();
      return res.status(200).json({ message: "Added to Cart" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
