import { CreateAgentDTO } from './create-agent.dto';

import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateAgentDTO extends CreateAgentDTO {
  @IsOptional()
  @Exclude()
  _id: string;
  readonly updated_at: Date;
}
