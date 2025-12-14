import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
    const { login, password } = dto;
    const user = await this.dbService.getUserByLogin(login);

    if (user.password !== password) {
      throw new ForbiddenException(`Authentication failed`);
    }

    const payload = {sub: user.id, username: user.login}
    return {access_token: await this.jwtService.signAsync(payload)}
  }
}
