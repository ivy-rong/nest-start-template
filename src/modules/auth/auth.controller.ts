import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { R } from 'src/common/class';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '注册' })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return new R({
      data: await this.authService.signup(signupDto),
      msg: '注册成功',
    });
  }

  @ApiOperation({ summary: '登录' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return new R({
      data: await this.authService.login(loginDto),
      msg: '登录成功',
    });
  }
}
