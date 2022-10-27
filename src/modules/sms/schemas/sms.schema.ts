import * as mongoose from 'mongoose';

export const SmsSchema = new mongoose.Schema(
  {
    agent_id: { type: String, required: [true, 'Agent Id is required'] },
    address: String,
    body: String,
    errorCode: Number,
    locked: Boolean,
    person: Number,
    protocol: Number,
    read: Boolean,
    receivedDate: Date,
    seen: Boolean,
    sentDate: Date,
    status: String,
    threadId: Number,
    type: String,
  },
  {
    timestamps: true,
  },
);

SmsSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
