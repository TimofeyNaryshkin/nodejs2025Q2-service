import {
  forwardRef,
  HttpCode,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites } from './interfaces/favorites.interface';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = { artists: [], albums: [], tracks: [] };

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  getAll() {
    const tracks = this.favorites.tracks.map((trackId) =>
      this.tracksService.getById(trackId),
    );
    const albums = this.favorites.albums.map((albumId) =>
      this.albumsService.getById(albumId),
    );
    const artists = this.favorites.artists.map((artistId) =>
      this.artistsService.getById(artistId),
    );

    return { artists, albums, tracks };
  }

  addTrack(id: string) {
    try {
      this.tracksService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Track with id ${id} doesn't exist`,
        );
      }
      throw error;
    }

    if (this.favorites.tracks.includes(id)) {
      throw new UnprocessableEntityException(`Track is already in favorites`);
    }

    this.favorites.tracks.push(id);
    return 'Track was added to favorites';
  }

  @HttpCode(204)
  removeTrack(id: string) {
    try {
      this.tracksService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Track with id ${id} is not favorite`);
      }
      throw error;
    }

    const trackIndex = this.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    this.favorites.tracks.splice(trackIndex, 1);
  }

  addAlbum(id: string) {
    try {
      this.albumsService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Album with id ${id} doesn't exist`,
        );
      }
      throw error;
    }

    if (this.favorites.albums.includes(id)) {
      throw new UnprocessableEntityException(`Album is already in favorites`);
    }

    this.favorites.albums.push(id);
    return 'Album was added to favorites';
  }

  @HttpCode(204)
  removeAlbum(id: string) {
    try {
      this.albumsService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Album with id ${id} is not favorite`);
      }
      throw error;
    }

    const albumIndex = this.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    this.favorites.albums.splice(albumIndex, 1);
  }

  addArtist(id: string) {
    try {
      this.artistsService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Artist with id ${id} doesn't exist`,
        );
      }
      throw error;
    }

    if (this.favorites.artists.includes(id)) {
      throw new UnprocessableEntityException(`Artist is already in favorites`);
    }

    this.favorites.artists.push(id);
    return 'Artist was added to favorites';
  }

  @HttpCode(204)
  removeArtist(id: string) {
    try {
      this.artistsService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Artist with id ${id} is not favorite`);
      }
      throw error;
    }

    const artistIndex = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    this.favorites.artists.splice(artistIndex, 1);
  }
}
