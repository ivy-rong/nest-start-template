import { Exclude } from 'class-transformer';

export class UserVo {
  id: number;
  username: string;
  nickName?: string;
  @Exclude()
  password: string;
  avatarUrl?: string;
  gender?: string;
  enabled: boolean;
}
