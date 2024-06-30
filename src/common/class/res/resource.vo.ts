import { Exclude } from 'class-transformer';

export class ResourceVo {
  createdAt: Date;

  createdBy?: number;

  updatedAt: Date;

  updatedBy?: number;

  @Exclude()
  deletedAt?: Date;

  @Exclude()
  deletedBy?: number;
}
