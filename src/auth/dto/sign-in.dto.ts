import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'User login',
    example: 'testuser',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
