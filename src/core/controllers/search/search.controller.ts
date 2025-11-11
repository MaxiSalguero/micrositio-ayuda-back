import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { SearchDto } from 'src/core/repositories/search/dtos/search.dto';
import { SearchService } from 'src/core/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  async searchGeneral(@Query() query: SearchDto) {
    return this.searchService.searchLupa(query.q, query.count);
  }

  @Get('category/:categoryId')
  async searchByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.searchService.searchByCategory(categoryId);
  }

  @Get('popular')
  async getPopularPosts(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.searchService.getPopularPosts(parsedLimit);
  }
}
