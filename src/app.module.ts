import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';
import { TVShowModule } from './tvshow/tvshow.module';
import { MovieModule } from './movie/movie.module';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Path to your environment file
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ListModule,
    UserModule,
    TVShowModule,
    MovieModule,
  ],
})
export class AppModule {}
