// /pages/api/getUser.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { email } = req.query; // Use query parameters to fetch the user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return user data including userId
      res.status(200).json({
        userId: user._id, // Include the user ID
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        weight: user.weight,
        height: user.height,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
