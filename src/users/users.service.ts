import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllUsers();
  }

  getById(id: string) {
    return this.dbService.getUserById(id);
  }

  create(dto: CreateUserDto) {
    return this.dbService.createUser(dto);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    return this.dbService.updateUserPassword(id, dto);
  }

  delete(id: string) {
    return this.dbService.deleteUser(id);
  }
}
