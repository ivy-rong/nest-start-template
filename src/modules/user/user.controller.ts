import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { R } from 'src/common/class';
import { PageUserDto, PatchUserDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto, '333333333333');
    return new R({
      data: await this.userService.create(createUserDto),
      msg: '创建成功',
    });
  }

  @ApiOperation({ summary: '用户列表' })
  @Get()
  async findMany(@Query() pageUserDto: PageUserDto, @Body() bodyData: any) {
    console.log(pageUserDto, '11111111111');
    console.log(bodyData, '2222222222222');
    return new R({
      data: await this.userService.findMany(pageUserDto),
      msg: '获取用户列表成功',
    });
  }

  @ApiOperation({ summary: '更新用户' })
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new R({
      data: await this.userService.update(id, updateUserDto),
      msg: '更新成功',
    });
  }

  @ApiOperation({ summary: '部分更新' })
  @Patch(':id')
  async patch(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return new R({
      data: await this.userService.update(id, patchUserDto),
      msg: '更新成功',
    });
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    await this.userService.remove(id);
    return new R({
      msg: '删除成功',
    });
  }
}
