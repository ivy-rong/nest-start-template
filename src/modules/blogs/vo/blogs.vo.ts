import { ResourceVo } from 'src/common/class';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SeoVo } from './seo.vo';

export class BlogsVo extends ResourceVo {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '标题' })
  title: string;

  @ApiPropertyOptional({ description: '描述', nullable: true })
  description?: string;

  @ApiProperty({ description: '图片路径' })
  image: string;

  @ApiProperty({ description: '路径' })
  path: string;

  @ApiPropertyOptional({ description: '日期', nullable: true })
  date: Date;

  @ApiPropertyOptional({ description: '分类', nullable: true })
  catalogue?: string;

  @ApiPropertyOptional({ description: '文本', nullable: true })
  text?: string;

  @ApiProperty({ description: 'seo' })
  seo: SeoVo;
}

