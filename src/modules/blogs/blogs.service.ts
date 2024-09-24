import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Blogs, Prisma } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBlogDto: Prisma.BlogsCreateInput) {
    return await this.prismaService.blogs.create({ data: createBlogDto });
  }

  async findAll(blogsFindManyArgs: Prisma.BlogsFindManyArgs) {
    return await this.prismaService.blogs.findMany({
      where: {
        ...blogsFindManyArgs,
      },
    });
  }

  findOne(blogsWhereUniqueInput: Prisma.BlogsWhereUniqueInput) {
    return this.prismaService.blogs.findUnique({
      where: blogsWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.BlogsWhereUniqueInput;
    data: Prisma.BlogsUpdateInput;
  }): Promise<Blogs> {
    const { data, where } = params;
    return this.prismaService.blogs.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.BlogsWhereUniqueInput): Promise<Blogs> {
    return this.prismaService.blogs.delete({
      where,
    });
  }
}
