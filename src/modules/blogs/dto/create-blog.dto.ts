import {
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
  NotContains,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSeoDto } from './create-seo.dto';

export class CreateBlogDto {
  @ApiProperty({ description: '标题' })
  @IsString({ message: '标题必须为字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @ApiPropertyOptional({ description: '描述' })
  @IsString({ message: '描述必须为字符串' })
  descriptiondescription?: string;

  @ApiProperty({ description: '图片路径' })
  @IsString({ message: '图片路径必须为字符串' })
  @IsNotEmpty({ message: '图片路径不能为空' })
  image: string;

  @ApiProperty({ description: '路由路径' })
  @IsString({ message: '路由路径必须为字符串' })
  @IsNotEmpty({ message: '路由路径不能为空' })
  path: string;

  @ApiPropertyOptional({ description: '日期' })
  @IsDate({ message: '必须为日期格式' })
  date?: string;

  @ApiPropertyOptional({ description: '分类' })
  @IsString({ message: '分类必须为字符串' })
  @IsNotEmpty({ message: '分类不能为空' })
  catalogue?: string;

  @ApiPropertyOptional({ description: '文本' })
  @IsString({ message: 'text必须为字符串' })
  @IsNotEmpty({ message: 'text不能为空' })
  text?: string;

  seo: CreateSeoDto;

  @ApiProperty({ description: '站点类型' })
  @IsString({ message: '站点类型必须为字符串' })
  @IsNotEmpty({ message: '站点类型不能为空' })
  siteType: string;
}

