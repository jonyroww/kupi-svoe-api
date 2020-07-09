import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateBasketItemDto } from './dto/CreateBasketItem.dto';
import { AuthGuard } from '@nestjs/passport';
import { MatchUserIdParamGuard } from '../common/guards/match-user-id-param.guard';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserPathDto } from '../users/dto/UserPath.dto';
import { BasketService } from './basket.service';
import { BasketItem } from './entities/BasketItem.entity';
import { Product } from '../products/entities/Product.entity';
import { ProductInBasketPathDto } from './dto/ProductInBasketPath.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('Basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get('users/:userId/basket-items')
  @ApiOperation({
    description: `Возвращает список объектов, у которых в полях product
      есть объект продукта. Этот метод может быть полезен когда нужно
      получить не только продукты в корзине, но и дату добавления в корзину.
      Отличие от users/:userId/products-in-basket в том, что он возвращает
      список непосредственно объектов продуктов.`,
  })
  @UseGuards(AuthGuard('jwt'), MatchUserIdParamGuard)
  @ApiOkResponse({ type: () => BasketItem, isArray: true })
  getBasketItems(@Param() { userId }: UserPathDto): Promise<BasketItem[]> {
    return this.basketService.getBasketItems(userId);
  }

  @Post('users/:userId/products-in-basket')
  @UseGuards(AuthGuard('jwt'), MatchUserIdParamGuard)
  @ApiCreatedResponse({ type: () => BasketItem })
  createBasketItem(
    @Param() { userId }: UserPathDto,
    @Body() createBasketItemDto: CreateBasketItemDto,
  ): Promise<BasketItem> {
    return this.basketService.createBasketItem(
      userId,
      createBasketItemDto.product_id,
    );
  }

  @Get('users/:userId/products-in-basket')
  @UseGuards(AuthGuard('jwt'), MatchUserIdParamGuard)
  @ApiOkResponse({ type: () => Product, isArray: true })
  getProductsInBasket(@Param() { userId }: UserPathDto): Promise<Product[]> {
    return this.basketService.getProductsInBasket(userId);
  }

  @Delete('users/:userId/products-in-basket/:productId')
  @UseGuards(AuthGuard('jwt'), MatchUserIdParamGuard)
  @ApiOkResponse({ type: () => Product, isArray: true })
  async removeProductFromBasket(
    @Param() { userId, productId }: ProductInBasketPathDto,
  ): Promise<void> {
    await this.basketService.deleteProductFromBasket(userId, productId);
  }
}
