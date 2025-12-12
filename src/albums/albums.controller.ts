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
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  async getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getById(id);
  }

  @Post()
  async create(@Body() albumDto: AlbumDto) {
    return this.albumService.create(albumDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() albumDto: AlbumDto,
  ) {
    return this.albumService.update(id, albumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumService.delete(id);
  }
}
