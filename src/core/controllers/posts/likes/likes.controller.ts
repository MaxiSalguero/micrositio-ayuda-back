import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateLikeDto } from '../../../../core/repositories/like/dtos/create-like.dto';
import { Like } from '../../../../core/repositories/like/like.entity';
import { LikesService } from '../../../../core/services/likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @Post()
  create(@Body() likeDto: CreateLikeDto): Promise<Like> {
    return this.likeService.create(likeDto);
  }

  @Get()
  findAll(): Promise<Like[]> {
    return this.likeService.findAll();
  }
}
