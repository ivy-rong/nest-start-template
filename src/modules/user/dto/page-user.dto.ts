import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { PageDto } from 'src/common/class';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PageUserDto extends PageDto {
  @ApiPropertyOptional({ description: '用户id' })
  @IsNumber({}, { message: 'id 必须是数字' })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ description: '是否启用' })
  @IsBoolean({ message: 'enabled 必须是布尔值' })
  @IsOptional()
  enabled?: boolean;
}
