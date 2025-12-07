import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumDto } from 'src/albums/dto/album.dto';
import { Album } from 'src/albums/interfaces/album.interface';
import { ArtistDto } from 'src/artists/dto/artist.dto';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { TrackDto } from 'src/tracks/dto/track.dto';
import { Track } from 'src/tracks/interfaces/track.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { User } from 'src/users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DatabaseService {
  private favorites: Favorites = { artists: [], albums: [], tracks: [] };
  private albums: Album[] = [];
  private artists: Artist[] = [];
  private tracks: Track[] = [];
  private users: User[] = [];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  createUser(dto: CreateUserDto) {
    const { login, password } = dto;
    const timestamp = Date.now();
    const user: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(user);
    return user;
  }

  updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }

  getAllTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    const track = this.tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  createTrack(dto: TrackDto) {
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

  updateTrack(id: string, dto: TrackDto): Track {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const updatedTrack = { ...this.tracks[trackIndex], ...dto };
    this.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  deleteTrack(id: string) {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.removeTrackFromFavorites(id);
    this.tracks.splice(trackIndex, 1);
  }

  nullifyArtistId(artistId: string) {
    this.tracks.forEach((t) => {
      if (t.artistId === artistId) {
        t.artistId = null;
      }
    });

    this.albums.forEach((a) => {
      if (a.artistId === artistId) {
        a.artistId = null;
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

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  createAlbum(dto: AlbumDto) {
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

  updateAlbum(id: string, dto: AlbumDto): Album {
    const albumIndex = this.albums.findIndex((a) => a.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updatedAlbum = { ...this.albums[albumIndex], ...dto };
    this.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  deleteAlbum(id: string) {
    const albumIndex = this.albums.findIndex((a) => a.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.removeAlbumFromFavorites(id);
    this.albums.splice(albumIndex, 1);

    this.nullifyAlbumId(id);
  }

  getAllArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  createArtist(dto: ArtistDto) {
    const { name, grammy } = dto;
    const artist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    this.artists.push(artist);
    return artist;
  }

  updateArtist(id: string, dto: ArtistDto): Artist {
    const artistIndex = this.artists.findIndex((a) => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updatedArtist = { ...this.artists[artistIndex], ...dto };
    this.artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }

  deleteArtist(id: string) {
    const artistIndex = this.artists.findIndex((a) => a.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.removeArtistFromFavorites(id);
    this.artists.splice(artistIndex, 1);

    this.nullifyArtistId(id);
  }

  getAllFavorites() {
    const tracks = this.favorites.tracks.map((trackId) =>
      this.getTrackById(trackId),
    );
    const albums = this.favorites.albums.map((albumId) =>
      this.getAlbumById(albumId),
    );
    const artists = this.favorites.artists.map((artistId) =>
      this.getArtistById(artistId),
    );

    return { artists, albums, tracks };
  }

  addTrackToFavorites(id: string) {
    try {
      this.getTrackById(id);
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

  removeTrackFromFavorites(id: string) {
    try {
      this.getTrackById(id);
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

  addAlbumToFavorites(id: string) {
    try {
      this.getAlbumById(id);
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

  removeAlbumFromFavorites(id: string) {
    try {
      this.getAlbumById(id);
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

  addArtistToFavorites(id: string) {
    try {
      this.getArtistById(id);
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

  removeArtistFromFavorites(id: string) {
    try {
      this.getArtistById(id);
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
