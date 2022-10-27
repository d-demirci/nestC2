import { Date, Document } from 'mongoose';

export interface Sms extends Document {
  readonly agent_id: string;
  readonly address: string;
  readonly body: string;
  readonly errorCode: number;
  readonly locked: boolean;
  readonly person: number;
  readonly protocol: number;
  readonly read: boolean;
  readonly receivedDate: Date;
  readonly seen: boolean;
  readonly sentDate: Date;
  readonly status: string;
  readonly threadId: number;
  readonly type: string;
}
