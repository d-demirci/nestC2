import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema(
  {
    agent_id: { type: String, required: [true, 'Agent Id is required'] },
    addresses: Object,
    display_name: String,
    emails: Object,
    events: Object,
    family_name: String,
    given_name: String,
    id: Number,
    phone_numbers: Object,
    websites: Object,
  },
  {
    timestamps: true,
  },
);

ContactSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});
