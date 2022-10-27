import { Document } from 'mongoose';

export interface Location extends Document {
  readonly agent_id: string;
  readonly x_axis: string;
  readonly y_axis: string;
}
