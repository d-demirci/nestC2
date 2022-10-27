import { CreateContactDTO } from './create-contact.dto';

import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateContactDTO extends CreateContactDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsOptional()
  @Exclude()
  agent_id: string;

  readonly updated_at: Date;
}
