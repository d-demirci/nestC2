export class CreateCallDTO {
  readonly agent_id: string;
  readonly name: string;
  readonly number: string;
  readonly type: string;
  readonly id: number;
  readonly duration: string;
  readonly is_read: boolean;
  readonly call_date: Date;
}
