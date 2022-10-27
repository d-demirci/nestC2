import * as mongoose from 'mongoose';

export const BrowserSchema = new mongoose.Schema(
  {
    agent_id: { type: String, required: [true, 'Agent Id is required'] },
    search: String,
    date: Date,
  },
  {
    timestamps: true,
  },
);

BrowserSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
