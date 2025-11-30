import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll() {
    return this.users;
  }

  getById(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(dto: CreateUserDto) {
    const { login, password } = dto;
    const timestamp = Date.now();
    const user: User = {
      id: uuidv4(),
      login,
      password,
      version: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(user);
    return user
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    console.log(user.password, dto)

    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user
  }

  delete(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }
}
