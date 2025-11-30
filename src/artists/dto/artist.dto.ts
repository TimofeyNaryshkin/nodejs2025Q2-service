import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @ApiProperty({
    description: 'Artist name',
    example: 'The Beatles',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Has Grammy award',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
