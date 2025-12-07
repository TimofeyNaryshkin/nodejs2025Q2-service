import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    return this.dbService.getAllUsers();
  }

  async getById(id: string) {
    return this.dbService.getUserById(id);
  }

  async create(dto: CreateUserDto) {
    return this.dbService.createUser(dto);
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    return this.dbService.updateUserPassword(id, dto);
  }

  async delete(id: string) {
    await this.dbService.deleteUser(id);
  }
}
