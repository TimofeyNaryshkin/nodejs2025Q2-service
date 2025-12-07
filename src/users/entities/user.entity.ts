import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
