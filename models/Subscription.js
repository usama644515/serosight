import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  price: {
    type: [String], // Array of strings
    required: true,
  },
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
