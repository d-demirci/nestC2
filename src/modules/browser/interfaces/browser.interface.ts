import { Date, Document } from 'mongoose';

export interface Browser extends Document {
  readonly agent_id: string;
  readonly search: string;
  readonly date: Date;
}
