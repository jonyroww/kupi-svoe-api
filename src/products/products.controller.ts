import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/User.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiTags('Products')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  createProduct(@Body() body: CreateProductDto, @GetUser() user: User) {
    return this.productsService.createProduct(body, user);
  }
}
