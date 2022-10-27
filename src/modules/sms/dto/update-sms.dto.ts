import { CreateSmsDTO } from './create-sms.dto';

import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateSmsDTO extends CreateSmsDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsOptional()
  @Exclude()
  agent_id: string;

  readonly updated_at: Date;
}
