import mongoose from 'mongoose';

const UserSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  numberOfTests: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.UserSubscription || mongoose.model('UserSubscription', UserSubscriptionSchema);
