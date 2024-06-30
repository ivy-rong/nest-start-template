import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SignupDto, LoginDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async signup(signupDto: SignupDto) {
    return 'This action adds a new user';
  }

  async login(loginDto: LoginDto) {
    return 'This action returns a user';
  }
}
