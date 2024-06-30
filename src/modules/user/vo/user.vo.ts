import { Exclude } from 'class-transformer';
import { ResourceVo } from 'src/common/class';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UserVo extends ResourceVo {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiPropertyOptional({ description: '昵称', nullable: true })
  nickName?: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiPropertyOptional({ description: '头像', nullable: true })
  avatarUrl?: string;

  @ApiPropertyOptional({ description: '性别', nullable: true })
  email?: string;

  @ApiPropertyOptional({ description: '性别', nullable: true })
  gender?: string;

  @ApiPropertyOptional({ description: '是否启用' })
  enabled: boolean;
}
