import { Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllArtists();
  }

  getById(id: string) {
    return this.dbService.getArtistById(id);
  }

  create(dto: ArtistDto) {
    return this.dbService.createArtist(dto);
  }

  update(id: string, dto: ArtistDto): Artist {
    return this.dbService.updateArtist(id, dto);
  }

  delete(id: string) {
    return this.dbService.deleteArtist(id);
  }
}
