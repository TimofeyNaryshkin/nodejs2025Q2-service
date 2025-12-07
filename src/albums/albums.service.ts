import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { AlbumDto } from './dto/album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllAlbums();
  }

  getById(id: string) {
    return this.dbService.getAlbumById(id);
  }

  create(dto: AlbumDto) {
    return this.dbService.createAlbum(dto);
  }

  update(id: string, dto: AlbumDto): Album {
    return this.dbService.updateAlbum(id, dto);
  }

  delete(id: string) {
    this.dbService.deleteAlbum(id);
  }
}
