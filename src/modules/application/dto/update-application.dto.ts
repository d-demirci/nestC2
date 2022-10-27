import { CreateApplicationDTO } from './create-application.dto';

import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateApplicationDTO extends CreateApplicationDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsOptional()
  @Exclude()
  agent_id: string;

  readonly updated_at: Date;
}
