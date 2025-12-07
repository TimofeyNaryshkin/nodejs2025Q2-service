import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password

  @ApiProperty({
    description: 'User new password',
    example: 'password12345',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}
