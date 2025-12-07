import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    return this.dbService.getAllTracks();
  }

  async getById(id: string) {
    return this.dbService.getTrackById(id);
  }

  async create(dto: TrackDto) {
    return this.dbService.createTrack(dto);
  }

  async update(id: string, dto: TrackDto) {
    return this.dbService.updateTrack(id, dto);
  }

  async delete(id: string) {
    await this.dbService.deleteTrack(id);
  }
}
