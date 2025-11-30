import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService
  ) {}

  getAll() {
    return this.tracks;
  }

  getById(id: string) {
    const track = this.tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  create(dto: TrackDto) {
    const { name, artistId, albumId, duration } = dto;
    const track: Track = {
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration,
    };
    this.tracks.push(track);
    return track;
  }

  update(id: string, dto: TrackDto): Track {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const updatedTrack = { ...this.tracks[trackIndex], ...dto };
    this.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  delete(id: string) {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.favoritesService.removeTrack(id);
    this.tracks.splice(trackIndex, 1);
  }

  nullifyArtistId(artistId: string) {
    this.tracks.forEach((t) => {
      if (t.artistId === artistId) {
        t.artistId = null;
      }
    });
  }

  nullifyAlbumId(albumId: string) {
    this.tracks.forEach((t) => {
      if (t.albumId === albumId) {
        t.albumId = null;
      }
    });
  }
}
