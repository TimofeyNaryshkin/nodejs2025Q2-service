import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { AlbumDto } from './dto/album.dto';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(private tracksService: TracksService) {}

  getAll() {
    return this.albums;
  }

  getById(id: string) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  create(dto: AlbumDto) {
    const { name, year, artistId } = dto;
    const album: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, dto: AlbumDto): Album {
    const albumIndex = this.albums.findIndex((a) => a.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updatedAlbum = { ...this.albums[albumIndex], ...dto };
    this.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  delete(id: string) {
    const albumIndex = this.albums.findIndex((a) => a.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.albums.splice(albumIndex, 1);

    this.tracksService.nullifyAlbumId(id)
  }

  nullifyArtistId(artistId: string) {
    this.albums.forEach((a) => {
      if (a.artistId === artistId) {
        a.artistId = null;
      }
    });
  }
}
