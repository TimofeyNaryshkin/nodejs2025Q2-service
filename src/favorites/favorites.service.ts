import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllFavorites();
  }

  addTrack(id: string) {
    return this.dbService.addTrackToFavorites(id);
  }

  removeTrack(id: string) {
    this.dbService.removeTrackFromFavorites(id);
  }

  addAlbum(id: string) {
    return this.dbService.addAlbumToFavorites(id);
  }

  removeAlbum(id: string) {
    this.dbService.removeAlbumFromFavorites(id);
  }

  addArtist(id: string) {
    return this.dbService.addArtistToFavorites(id);
  }

  removeArtist(id: string) {
    this.dbService.removeArtistFromFavorites(id);
  }
}
