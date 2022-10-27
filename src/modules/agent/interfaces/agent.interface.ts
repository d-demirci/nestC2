import { Document } from 'mongoose';

export interface Agent extends Document {
  readonly agent_id: string;
  readonly country: string;
  readonly software_version: string;
  readonly sim_operator: string;
  readonly device_model: string;
  readonly device_language: string;
  readonly is_rooted: boolean;
  readonly charge: string;
  readonly total_ram: string;
  // readonly created_at: Date;
  // readonly updated_at: Date;
}
