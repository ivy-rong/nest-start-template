import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { PageDto } from 'src/common/class';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PageBlogsDto extends PageDto {
  @ApiPropertyOptional({ description: 'blogs id' })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ description: '站点类型' })
  @IsString({ message: 'siteType 必须是string' })
  @IsOptional()
  siteType?: string;
}

