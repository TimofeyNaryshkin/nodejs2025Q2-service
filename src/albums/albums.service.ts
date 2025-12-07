import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    return this.dbService.getAllAlbums();
  }

  async getById(id: string) {
    return this.dbService.getAlbumById(id);
  }

  async create(dto: AlbumDto) {
    return this.dbService.createAlbum(dto);
  }

  async update(id: string, dto: AlbumDto) {
    return this.dbService.updateAlbum(id, dto);
  }

  async delete(id: string) {
    await this.dbService.deleteAlbum(id);
  }
}
