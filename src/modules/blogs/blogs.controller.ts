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
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Prisma } from '@prisma/client';
import { query } from 'express';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiOperation({ summary: '创建blogs' })
  @Post()
  create(@Body() createBlogDto: Prisma.BlogsCreateInput) {
    return this.blogsService.create(createBlogDto);
  }

  @ApiOperation({ summary: '得到所有类型blogs' })
  @Get()
  findAll(@Query() siteType: string) {
    return this.blogsService.findAll(siteType);
  }

  @ApiOperation({ summary: '得到单个blogs' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @ApiOperation({ summary: '更新blogs' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @ApiOperation({ summary: '删除blogs' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
