import { CreateBrowserDTO } from './create-browser.dto';

import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateBrowserDTO extends CreateBrowserDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsOptional()
  @Exclude()
  agent_id: string;

  readonly updated_at: Date;
}
