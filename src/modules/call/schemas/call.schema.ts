import * as mongoose from 'mongoose';

export const CallSchema = new mongoose.Schema(
  {
    agent_id: { type: String, required: [true, 'Agent Id is required'] },
    name: String,
    number: String,
    type: String,
    id: Number,
    duration: String,
    is_read: Boolean,
    call_date: Date,
  },
  {
    timestamps: true,
  },
);

CallSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
