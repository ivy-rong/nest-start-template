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
import { CreateJsonDto } from './dto/create-json.dto';
import { UpdateJsonDto } from './dto/update-json.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('json')
@Controller('json')
export class JsonController {
  constructor(private readonly jsonService: JsonService) {}

  @ApiOperation({ summary: '创建JSON' })
  @Post()
  create(@Body() createJsonDto: CreateJsonDto) {
    return this.jsonService.create(createJsonDto);
  }

  @ApiOperation({ summary: '得到JSON' })
  @Get()
  findAll() {
    return this.jsonService.findAll();
  }

  @ApiOperation({ summary: '得到单个JSON' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jsonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJsonDto: UpdateJsonDto) {
    return this.jsonService.update(+id, updateJsonDto);
  }

  @ApiOperation({ summary: '删除JSON' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jsonService.remove(+id);
  }
}
