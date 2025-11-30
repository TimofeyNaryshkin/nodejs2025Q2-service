import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule, TracksModule, FavoritesModule],
})
export class AppModule {}
