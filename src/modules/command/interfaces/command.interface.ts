import { Document } from 'mongoose';

export interface Command extends Document {
  readonly agent_id: string;
  readonly name: string;
  readonly value: string;
  readonly status: string;
}
