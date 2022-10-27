import * as mongoose from 'mongoose';
export const ApplicationSchema = new mongoose.Schema(
  {
    agent_id: { type: String, required: [true, 'Agent Id is required'] },
    name: String,
    package: String,
    directory: String,
  },
  {
    timestamps: true,
  },
);

ApplicationSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
