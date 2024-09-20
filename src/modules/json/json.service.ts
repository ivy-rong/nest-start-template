import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { json, Prisma } from '@prisma/client';
@Injectable()
export class JsonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.jsonCreateInput): Promise<json> {
    return this.prismaService.json.create({ data });
  }

  async findAll() {
    return `This action returns all json`;
  }

  async findOne(postWhereUniqueInput: Prisma.jsonWhereUniqueInput) {
    return this.prismaService.json.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.jsonWhereUniqueInput;
    data: Prisma.jsonUpdateInput;
  }): Promise<json> {
    const { data, where } = params;
    return this.prismaService.json.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.jsonWhereUniqueInput): Promise<json> {
    return this.prismaService.json.delete({
      where,
    });
  }
}
