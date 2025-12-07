import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistDto } from './dto/artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() artistDto: ArtistDto) {
    return this.artistsService.create(artistDto);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() artistDto: ArtistDto) {
    return this.artistsService.update(id, artistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.artistsService.delete(id);
  }
}
