import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(dto: CreateUserDto) {
    await this.dbService.createUser(dto);
    return 'User created successfully';
  }

  async signIn(dto: SignInDto) {
    const { login, password } = dto;
    const user = await this.dbService.getUserByLogin(login);

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException(`Authentication failed`);
    }

    const tokens = await this.generateTokens(user.id, user.login);
    return tokens;
  }

  async refresh(dto: RefreshDto) {
    const { refresh_token } = dto;
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refresh_token);

      const tokens = await this.generateTokens(payload.sub, payload.username);
      return tokens;
    } catch (error) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }

  private async generateTokens(userId: string, login: string) {
    const payload = { sub: userId, username: login };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
