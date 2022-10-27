import * as mongoose from 'mongoose';

export const AgentSchema = new mongoose.Schema(
  {
    agent_id: {
      type: String,
      required: [true, 'Agent Id is required'],
      unique: true,
    },
    country: String,
    software_version: String,
    sim_operator: String,
    device_model: String,
    device_language: String,
    is_rooted: Boolean,
    charge: String,
    total_ram: String,
  },
  {
    timestamps: true,
  },
);
AgentSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
