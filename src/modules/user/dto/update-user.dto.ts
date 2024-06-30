import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  NotContains,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名' })
  @Length(4, 16, { message: '用户名为4-16个字符' })
  @NotContains(' ', { message: '用户名不能包含空格' })
  @IsString({ message: '用户名格式不正确' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiPropertyOptional({ description: '昵称' })
  @MaxLength(16, { message: '昵称长度不能超过16个字符' })
  @IsString({ message: '昵称格式不正确' })
  @IsOptional()
  nickName?: string;

  @ApiPropertyOptional({ description: '邮箱' })
  @MaxLength(50, { message: '邮箱长度不能超过50个字符' })
  @IsEmail(undefined, { message: '邮箱格式不正确' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: '头像地址' })
  @MaxLength(100, { message: '头像地址长度不能超过100个字符' })
  @IsUrl(undefined, { message: '头像地址格式不正确' })
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({ description: '电话号码' })
  @MaxLength(25, { message: '电话长度不能超过25个字符' })
  @IsPhoneNumber(undefined, { message: '电话格式不正确' })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ description: '性别' })
  @MaxLength(10, { message: '性别长度不能超过10个字符' })
  @IsString({ message: '性别是字符串' })
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ description: '是否启用' })
  @IsBoolean({ message: '是否启用是布尔值' })
  @IsOptional()
  enabled?: boolean;
}
