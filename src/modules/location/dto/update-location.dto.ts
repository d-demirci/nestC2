import { CreateLocationDTO } from './create-location.dto';

import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateLocationDTO extends CreateLocationDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsOptional()
  @Exclude()
  agent_id: string;

  readonly updated_at: Date;
}
