import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): UserEntity[] {
    const users = this.usersService.getAll();
    return users.map((u) => new UserEntity(u));
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(this.usersService.getById(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(this.usersService.create(createUserDto));
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return new UserEntity(
      this.usersService.updatePassword(id, updatePasswordDto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.usersService.delete(id);
  }
}
