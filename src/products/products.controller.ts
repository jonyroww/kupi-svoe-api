import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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
import { IdParamDto } from '../common/dto/id-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsAdminGuard } from '../common/guards/is-admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiTags('Products')
  @ApiCreatedResponse({ type: () => Product })
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
  @ApiOkResponse({ type: () => Product })
  @Get()
  getAllProducts(@Query() query: GetAllQueryDto): Promise<Paginated<Product>> {
    return this.productsService.getAllProducts(query);
  }

  @ApiTags('Products')
  @ApiOkResponse({ type: () => Product })
  @Get('/:id')
  getOneProduct(@Param() params: IdParamDto): Promise<Product> {
    return this.productsService.getOneProduct(params);
  }

  @ApiTags('Products')
  @ApiCreatedResponse({ type: () => Product })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('/:id')
  updateProduct(
    @Body() body: UpdateProductDto,
    @GetUser() user: User,
    @Param() params: IdParamDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(body, user, params);
  }

  @ApiTags('Products')
  @ApiOkResponse()
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  deleteProduct(@Param() params: IdParamDto) {
    return this.productsService.deleteProduct(params);
  }
}
