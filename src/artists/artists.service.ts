import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    return this.dbService.getAllArtists();
  }

  async getById(id: string) {
    return this.dbService.getArtistById(id);
  }

  async create(dto: ArtistDto) {
    return this.dbService.createArtist(dto);
  }

  async update(id: string, dto: ArtistDto) {
    return this.dbService.updateArtist(id, dto);
  }

  async delete(id: string) {
    await this.dbService.deleteArtist(id);
  }
}
