import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModuleOptions } from './config/option';
import { PostModule } from './modules/post/post.module';
import { LikeModule } from './modules/like/like.module';
import { RelatedModule } from './modules/related/related.module';
import { TaxonomyModule } from './modules/taxonomy/taxonomy.module';
import { DataService } from './scripts/DataService';
import { CategoryModule } from './modules/category/category.module';
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
        dropSchema: true,
      }),
    }),
    CategoryModule,
    PostModule,
    LikeModule,
    RelatedModule,
    TaxonomyModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataService],
})
export class AppModule {}
