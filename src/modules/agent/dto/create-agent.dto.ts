export class CreateAgentDTO {
  readonly country: string;
  readonly agent_id: string;
  readonly software_version: string;
  readonly sim_operator: string;
  readonly device_model: string;
  readonly device_language: string;
  readonly is_rooted: boolean;
  readonly charge: string;
  readonly total_ram: string;
  readonly created_at: Date;
}
