import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSeoDto {
  @ApiPropertyOptional({ description: '关键字' })
  @IsString({ message: '关键字必须为字符串' })
  keywords?: string;

  @ApiPropertyOptional({ description: '描述' })
  @IsString({ message: '描述必须为字符串' })
  description?: string;

  @ApiPropertyOptional({ description: '标题' })
  @IsString({ message: '关键字必须为字符串' })
  title?: string;

  @ApiPropertyOptional({ description: 'h1' })
  @IsString({ message: 'h1必须为字符串' })
  h1?: string;
}

