import { Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { TrackDto } from './dto/track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllTracks();
  }

  getById(id: string) {
    return this.dbService.getTrackById(id);
  }

  create(dto: TrackDto) {
    return this.dbService.createTrack(dto);
  }

  update(id: string, dto: TrackDto): Track {
    return this.dbService.updateTrack(id, dto);
  }

  delete(id: string) {
    this.dbService.deleteTrack(id);
  }
}
