export class CreateContactDTO {
  readonly agent_id: string;
  readonly addresses: object[];
  readonly display_name: string;
  readonly emails: object[];
  readonly events: object[];
  readonly family_name: string;
  readonly given_name: string;
  readonly id: number;
  readonly phone_numbers: object[];
  readonly websites: object[];
}
