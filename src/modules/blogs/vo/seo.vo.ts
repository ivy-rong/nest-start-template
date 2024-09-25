import { Exclude } from 'class-transformer';
import { ResourceVo } from 'src/common/class';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class SeoVo extends ResourceVo {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiPropertyOptional({ description: '关键字', nullable: true })
  keywords?: string;

  @ApiPropertyOptional({ description: '描述', nullable: true })
  description?: string;

  @ApiPropertyOptional({ description: '标题', nullable: true })
  title?: string;

  @ApiPropertyOptional({ description: 'h1', nullable: true })
  h1?: string;
}

