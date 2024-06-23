import { IsNotEmpty, IsString, Length, NotContains } from 'class-validator';
export class CreateUserDto {
  @Length(4, 16, { message: '用户名长度4-16位' })
  @NotContains(' ', { message: '用户名不能包含空格' })
  @IsString({ message: '用户名必须为字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @Length(6, 16, { message: '密码长度4-16位' })
  @NotContains(' ', { message: '密码不能包含空格' })
  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
