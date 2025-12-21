import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseService, PrismaService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
