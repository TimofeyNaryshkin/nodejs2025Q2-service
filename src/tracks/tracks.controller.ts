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
import { TracksService } from './tracks.service';
import { TrackDto } from './dto/track.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('JWT-auth')
@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.getById(id);
  }

  @Post()
  async create(@Body() trackDto: TrackDto) {
    return this.tracksService.create(trackDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() trackDto: TrackDto,
  ) {
    return this.tracksService.update(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.tracksService.delete(id);
  }
}
