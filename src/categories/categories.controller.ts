import {
  Controller,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/Category.entity';
import { CategoriesService } from './categories.service';
import { CategoryPathDto } from './dto/CategoryPath.dto';

@Controller()
@ApiTags('Categories')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('categories-tree')
  @ApiOperation({ description: 'Возвращает иерархическое дерево категорий' })
  @ApiOkResponse({ type: () => Category, isArray: true })
  async getCategoriesTree(): Promise<Category[]> {
    return this.categoriesService.getCategoriesTree();
  }

  @Get('categories')
  @ApiOperation({ description: 'Искать все категории' })
  @ApiOkResponse({ type: () => Category, isArray: true })
  async findCategories(): Promise<Category[]> {
    return this.categoriesService.findCategories();
  }

  @Get('categories/:categoryId')
  @ApiOkResponse({ type: () => Category })
  async getCategory(
    @Param() { categoryId }: CategoryPathDto,
  ): Promise<Category> {
    return this.categoriesService.getCategoryOrFailHttp(categoryId);
  }
}
