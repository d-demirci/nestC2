import * as mongoose from 'mongoose';
export const LocationSchema = new mongoose.Schema(
  {
    agent_id: { type: String, required: [true, 'Agent Id is required'] },
    x_axis: String,
    y_axis: String,
  },
  {
    timestamps: true,
  },
);

LocationSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
