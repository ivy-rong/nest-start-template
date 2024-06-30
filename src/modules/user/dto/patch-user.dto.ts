import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  NotContains,
} from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { OmitType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PatchUserDto extends OmitType(UpdateUserDto, [
  'username',
] as const) {
  @ApiPropertyOptional({ description: '用户名' })
  @Length(4, 16, { message: '用户名为4-16个字符' })
  @NotContains(' ', { message: '用户名不能包含空格' })
  @IsString({ message: '用户名格式不正确' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username?: string;

  @ApiPropertyOptional({ description: '密码' })
  @Length(6, 16, { message: '密码为6-16个字符' })
  @NotContains(' ', { message: '密码不能包含空格' })
  @IsString({ message: '密码格式不正确' })
  @IsOptional()
  password?: string;
}
