import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, PageUserDto, PatchUserDto } from './dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { hash } from '@node-rs/bcrypt';
import type { Prisma } from '@prisma/client';
import _ from 'lodash';
import { PageUserVo, UserVo } from './vo';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password);
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });
    const userVo = plainToClass(UserVo, user);
    return userVo;
  }

  async findMany(pageUserDto: PageUserDto) {
    const { page, pageSize, keywords, startTime, endTime, enabled, id } =
      pageUserDto;

    const where: Prisma.UserWhereInput = {
      deletedAt: null,
      AND: [
        {
          createdAt: {
            ...(startTime && { gte: startTime }),
            ...(endTime && { lte: endTime }),
          },
          id: {
            ...(id && { equals: Number(id) }),
          },
          enabled: {
            ...(enabled && { equals: true }),
          },
        },
      ],
      OR: keywords
        ? [
            {
              id: {
                equals:
                  _.toNumber(keywords) < 100000 ? _.toNumber(keywords) : 0,
              },
            },
            { username: { contains: keywords } },
          ]
        : undefined,
    };

    const records = await this.prismaService.user.findMany({
      where,

      skip: 0,
      // (page - 1) * Number(pageSize),
      // take: Number(pageSize),
      take: 10,
    });

    const total = await this.prismaService.user.count({ where });
    return plainToClass(PageUserVo, {
      records,
      total,
      page,
      pageSize,
    });
  }

  async findOneById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const userVo = plainToClass(UserVo, user);
    return userVo;
  }

  async update(
    id: number,
    updateOrPatchUserDto: UpdateUserDto | PatchUserDto,
    updatedBy?: number,
  ) {
    const { username, phoneNumber, email } = updateOrPatchUserDto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`ID 为 '${id}' 的用户未找到.`);
    }
    console.log(existingUser);

    if (username) {
      const existingUserByUsername = await this.prismaService.user.findUnique({
        where: { username },
      });
      console.log(existingUserByUsername);
      if (existingUserByUsername && existingUserByUsername.id !== id) {
        throw new NotFoundException(`用户名 '${username}' 已被占用.`);
      }
    }

    if (phoneNumber) {
      const existingUserByPhoneNumber =
        await this.prismaService.user.findUnique({
          where: { phoneNumber },
        });
      console.log(existingUserByPhoneNumber);
      if (existingUserByPhoneNumber && existingUserByPhoneNumber.id !== id) {
        throw new NotFoundException(`手机号 '${phoneNumber}' 已被使用.`);
      }
    }

    if (email) {
      const existingUserByEmail = await this.prismaService.user.findUnique({
        where: { email },
      });
      console.log(existingUserByEmail);
      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new NotFoundException(`邮箱号 '${email}' 已被使用.`);
      }
    }

    const updateUserVo = await this.prismaService.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...updateOrPatchUserDto,
        updatedBy,
      },
    });

    console.log(updateUserVo);

    const userVo = plainToClass(UserVo, updateUserVo);
    return userVo;
  }

  async remove(id: number, deletedBy?: number) {
    await this.prismaService.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date().toISOString(),
        deletedBy,
      },
    });
  }
}
