import * as mongoose from 'mongoose';

export const CommandSchema = new mongoose.Schema(
  {
    agent_id: { type: String, required: [true, 'Agent Id is required'] },
    name: String,
    value: String,
    status: { type: String, default: 'WAITING' },
  },
  {
    timestamps: true,
  },
);

CommandSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
