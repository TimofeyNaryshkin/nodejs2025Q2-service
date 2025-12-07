import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { AlbumDto } from 'src/albums/dto/album.dto';
import { Album } from 'src/albums/interfaces/album.interface';
import { ArtistDto } from 'src/artists/dto/artist.dto';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { PrismaService } from 'src/prisma.service';
import { TrackDto } from 'src/tracks/dto/track.dto';
import { Track } from 'src/tracks/interfaces/track.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map((u) => ({
      ...u,
      createdAt: u.createdAt.getTime(),
      updatedAt: u.updatedAt.getTime(),
    }));
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: dto });
    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: { increment: 1 },
      },
    });
    return {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }

  async getAllTracks() {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  async createTrack(dto: TrackDto) {
    return this.prisma.track.create({ data: dto });
  }

  async updateTrack(id: string, dto: TrackDto): Promise<Track> {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }

  async getAllAlbums() {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async createAlbum(dto: AlbumDto) {
    return this.prisma.album.create({ data: dto });
  }

  async updateAlbum(id: string, dto: AlbumDto): Promise<Album> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }

  async getAllArtists() {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  async createArtist(dto: ArtistDto) {
    return this.prisma.artist.create({ data: dto });
  }

  async updateArtist(id: string, dto: ArtistDto): Promise<Artist> {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      throw error;
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      throw error;
    }
  }

  async getAllFavorites() {
    const [favAtrists, favAlbums, favTracks] = await Promise.all([
      this.prisma.favoriteArtist.findMany({ include: { artist: true } }),
      this.prisma.favoriteAlbum.findMany({ include: { album: true } }),
      this.prisma.favoriteTrack.findMany({ include: { track: true } }),
    ]);

    return {
      artists: favAtrists.map((f) => f.artist),
      albums: favAlbums.map((f) => f.album),
      tracks: favTracks.map((f) => f.track),
    };
  }

  async addTrackToFavorites(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${id} doesn't exist`,
      );
    }
    await this.prisma.favoriteTrack.create({ data: { trackId: id } });
    return 'Track was added to favorites';
  }

  async removeTrackFromFavorites(id: string) {
    try {
      await this.prisma.favoriteTrack.delete({ where: { trackId: id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} is not favorite`);
      }
      throw error;
    }
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${id} doesn't exist`,
      );
    }
    await this.prisma.favoriteAlbum.create({ data: { albumId: id } });
    return 'Album was added to favorites';
  }

  async removeAlbumFromFavorites(id: string) {
    try {
      await this.prisma.favoriteAlbum.delete({ where: { albumId: id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} is not favorite`);
      }
      throw error;
    }
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${id} doesn't exist`,
      );
    }
    await this.prisma.favoriteArtist.create({ data: { artistId: id } });
    return 'Artist was added to favorites';
  }

  async removeArtistFromFavorites(id: string) {
    try {
      await this.prisma.favoriteArtist.delete({ where: { artistId: id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} is not favorite`);
      }
      throw error;
    }
  }
}
