import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AlbumDto {
  @ApiProperty({
    description: 'Album name',
    example: 'Abbey Road',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Release year',
    example: 1969,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    description: 'Artist ID (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist
}
