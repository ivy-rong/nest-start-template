export class CreateJsonDto {
  json?: string | null;
  createdAt?: Date | string;
  createdBy?: number | null;
  updatedAt?: Date | string | null;
  updatedBy?: number | null;
  deletedAt?: Date | string | null;
  deletedBy?: number | null;
}
