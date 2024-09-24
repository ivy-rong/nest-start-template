import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class PageDto {
  @ApiProperty({ description: '页码' })
  @IsPositive({ message: '页码必须大于 0' })
  @IsNumber({}, { message: 'page 必须是数字' })
  page: number = 1;

  @ApiProperty({ description: '每页条数' })
  @IsPositive({ message: '每页条数必须大于 0' })
  @IsNumber({}, { message: 'pageSize 必须是数字' })
  pageSize: number = 10;

  @ApiPropertyOptional({ description: '关键字' })
  @IsString({ message: '搜索关键字必须是一个字符串' })
  @IsOptional()
  keywords?: string;

  @ApiPropertyOptional({ description: '开始时间' })
  @IsISO8601(
    { strict: true, strictSeparator: true },
    { message: '开始时间必须是一个有效的日期字符串' },
  )
  @IsOptional()
  startTime?: string;

  @ApiPropertyOptional({ description: '结束时间' })
  @IsISO8601(
    { strict: true, strictSeparator: true },
    { message: '结束时间必须是一个有效的日期字符串' },
  )
  @IsOptional()
  endTime?: string;
}
