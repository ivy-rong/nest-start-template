import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PageBlogsDto } from './dto/page-blog.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Blogs, Prisma } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBlogDto: Prisma.BlogsCreateInput) {
    const { seo, siteType, ...restData } = createBlogDto;
    console.log(createBlogDto, '1111');
    console.log(seo, 'seo');
    console.log(siteType, 'siteType');

    let siteTypeData = {};

    const siteTypeExists = await this.prismaService.siteType.findFirst({
      where: { siteType: 'siteType?.qweqwe' as string },
    });

    if (siteTypeExists) {
      siteTypeData = {
        connect: { id: siteTypeExists.id },
      };
    } else {
      siteTypeData = {
        create: {
          siteType,
        },
      };
    }

    return await this.prismaService.blogs.create({
      data: {
        ...createBlogDto,
        seo: {
          create: seo,
        },
        siteType: siteTypeData,
      },
    });
  }

  async findAll(pageBlogsDto: PageBlogsDto) {
    const { page, pageSize, keywords, startTime, endTime, siteType, id } =
      pageBlogsDto;

    const where: Prisma.BlogsWhereInput = {
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
        },
      ],
      OR: keywords ? [{ title: { contains: keywords } }] : undefined,
      ...(siteType && { siteType: { siteType } }),
    };

    const records = await this.prismaService.blogs.findMany({
      where,
      skip: (page - 1) * Number(pageSize),
      take: Number(pageSize),
    });

    const total = await this.prismaService.blogs.count({ where });

    return await this.prismaService.blogs.findMany({
      where,
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

