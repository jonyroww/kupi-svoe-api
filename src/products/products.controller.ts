import { Controller, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/User.entity';
import { Product } from './entities/Product.entity';
import { GetAllQueryDto } from './dto/get-all.dto';
import { Paginated } from '../common/interfaces/paginated-entity.interface';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiTags('Products')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  createProduct(
    @Body() body: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.createProduct(body, user);
  }

  @ApiTags('Products')
  @ApiOkResponse()
  @Get()
  getAllAds(@Query() query: GetAllQueryDto): Promise<Paginated<Product>> {
    return this.productsService.getAllProducts(query);
  }
}
