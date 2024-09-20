import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JsonService } from './json.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { json as JsonModel, Prisma } from '@prisma/client';
import { R } from 'src/common/class';

@ApiTags('json')
@Controller('json')
export class JsonController {
  constructor(private readonly jsonService: JsonService) {}

  @ApiOperation({ summary: '创建JSON' })
  @ApiBody({})
  @Post()
  async create(
    @Body() createJsonDto: Prisma.jsonCreateInput,
  ): Promise<R<JsonModel>> {
    return new R({
      data: await this.jsonService.create(createJsonDto),
      msg: '创建JSON数据成功',
    });
  }

  @ApiOperation({ summary: '得到JSON' })
  @Get()
  findAll() {
    return this.jsonService.findAll();
  }

  @ApiOperation({ summary: '得到单个JSON' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<R<JsonModel>> {
    return new R({
      data: await this.jsonService.findOne({ id: Number(id) }),
      msg: '获取JSON数据成功',
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJsonDto: Prisma.jsonUpdateInput,
  ): Promise<R<JsonModel>> {
    return new R({
      data: await this.jsonService.update({
        where: { id: Number(id) },
        data: updateJsonDto,
      }),
      msg: '更新JSON数据成功',
    });
  }

  @ApiOperation({ summary: '删除JSON' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<R<JsonModel>> {
    return new R({
      data: await this.jsonService.remove({ id: Number(id) }),
      msg: '删除JSON数据成功',
    });
  }
}
