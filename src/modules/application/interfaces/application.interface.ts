import { Document } from 'mongoose';

export interface Application extends Document {
  readonly agent_id: string;
  readonly name: string;
  readonly package: string;
  readonly directory: string;
}
