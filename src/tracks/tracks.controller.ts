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

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.getById(id);
  }

  @Post()
  create(@Body() trackDto: TrackDto) {
    return this.tracksService.create(trackDto);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() trackDto: TrackDto) {
    return this.tracksService.update(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.tracksService.delete(id);
  }
}
