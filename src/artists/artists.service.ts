import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfaces/artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsServise: AlbumsService,
  ) {}

  getAll() {
    return this.artists;
  }

  getById(id: string) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  create(dto: ArtistDto) {
    const { name, grammy } = dto;
    const artist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, dto: ArtistDto): Artist {
    const artistIndex = this.artists.findIndex((a) => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updatedArtist = { ...this.artists[artistIndex], ...dto };
    this.artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }

  delete(id: string) {
    const artistIndex = this.artists.findIndex((a) => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists.splice(artistIndex, 1);

    this.tracksService.nullifyArtistId(id);
    this.albumsServise.nullifyArtistId(id)
  }
}
