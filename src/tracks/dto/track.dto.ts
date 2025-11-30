import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class TrackDto {
  @ApiProperty({
    description: 'Track name',
    example: 'Come Together',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Artist ID (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @ApiPropertyOptional({
    description: 'Album ID (UUID v4)',
    example: '650e8400-e29b-41d4-a716-446655440000',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album

  @ApiProperty({
    description: 'Duration in seconds',
    example: 259,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
