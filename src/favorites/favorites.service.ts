import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    return this.dbService.getAllFavorites();
  }

  async addTrack(id: string) {
    return this.dbService.addTrackToFavorites(id);
  }

  async removeTrack(id: string) {
    await this.dbService.removeTrackFromFavorites(id);
  }

  async addAlbum(id: string) {
    return this.dbService.addAlbumToFavorites(id);
  }

  async removeAlbum(id: string) {
    await this.dbService.removeAlbumFromFavorites(id);
  }

  async addArtist(id: string) {
    return this.dbService.addArtistToFavorites(id);
  }

  async removeArtist(id: string) {
    await this.dbService.removeArtistFromFavorites(id);
  }
}
