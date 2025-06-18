import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModuleOptions } from './config/option';
import { Category } from './entities/category.entity';
import { Like } from './entities/like.entity';
import { View } from './entities/view.entity';
import { Post } from './entities/post.entity';
import { Related } from './entities/related.entity';
import { Taxonomy } from './entities/taxonomy.entity';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number | undefined>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Category, Like, View, Post, Related, Taxonomy]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
