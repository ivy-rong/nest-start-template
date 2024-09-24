import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import type { Prisma } from '@prisma/client';

import type { PageBlogsDto } from './dto/page-blog.dto';
import { R } from 'src/common/class';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiOperation({ summary: '创建blogs' })
  @ApiBody({ type: Prisma.BlogsCreateInput })
  @Post()
  async create(@Body() createBlogDto: Prisma.BlogsCreateInput) {
    return new R({
      data: await this.blogsService.create(createBlogDto),
      msg: '创建成功',
    });
  }

  @ApiOperation({ summary: '得到所有类型blogs' })
  @ApiQuery({ name: 'siteType', required: true, type: String })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'pageSize', required: true, type: Number })
  @Get()
  async findAll(@Query() pageBlogsDto: PageBlogsDto) {
    return new R({
      data: await this.blogsService.findAll(pageBlogsDto),
      msg: '获取blogs列表成功',
    });
  }

  @ApiOperation({ summary: '得到单个blogs' })
  @ApiParam({
    name: 'id',
    description: 'ID',
    required: true,
    type: Number,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new R({
      data: await this.blogsService.findOne({ id: +id }),
      msg: '获取blogs成功',
    });
  }

  @ApiOperation({ summary: '更新blogs' })
  @ApiParam({
    name: 'id',
    description: 'ID',
    required: true,
    type: Number,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: Prisma.BlogsUpdateInput,
  ) {
    return new R({
      data: await this.blogsService.update({
        where: { id: +id },
        data: updateBlogDto,
      }),
      msg: '更新blogs成功',
    });
  }

  @ApiOperation({ summary: '删除blogs' })
  @ApiParam({
    name: 'id',
    description: 'ID',
    required: true,
    type: Number,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new R({
      data: await this.blogsService.remove({ id: +id }),
      msg: '更新blogs成功',
    });
  }
}
