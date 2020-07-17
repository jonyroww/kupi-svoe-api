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
  Put,
} from '@nestjs/common';
import { CreateBasketItemDto } from './dto/CreateBasketItem.dto';
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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BasketItemPathDto } from './dto/BasketItemPath.dto';
import { UpdateBasketItemDto } from './dto/UpdateBasketItem.dto';

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
  @UseGuards(JwtAuthGuard, MatchUserIdParamGuard)
  @ApiOkResponse({ type: () => BasketItem, isArray: true })
  getBasketItems(@Param() { userId }: UserPathDto): Promise<BasketItem[]> {
    return this.basketService.getBasketItems(userId);
  }

  @Post('users/:userId/basket-items')
  @UseGuards(JwtAuthGuard, MatchUserIdParamGuard)
  @ApiCreatedResponse({ type: () => BasketItem })
  createBasketItem(
    @Param() { userId }: UserPathDto,
    @Body() createBasketItemDto: CreateBasketItemDto,
  ): Promise<BasketItem> {
    return this.basketService.createBasketItem(userId, createBasketItemDto);
  }

  @Put('users/:userId/basket-items/:basketItemId')
  @UseGuards(JwtAuthGuard, MatchUserIdParamGuard)
  @ApiOkResponse({ type: () => BasketItem })
  updateBasketItem(
    @Param() { userId, basketItemId }: BasketItemPathDto,
    @Body() updateData: UpdateBasketItemDto,
  ): Promise<BasketItem> {
    return this.basketService.updateBasketItem(
      userId,
      basketItemId,
      updateData,
    );
  }

  @Delete('users/:userId/basket-items/:basketItemId')
  @UseGuards(JwtAuthGuard, MatchUserIdParamGuard)
  @ApiOkResponse()
  async deleteUsersBasketItem(
    @Param() { userId, basketItemId }: BasketItemPathDto,
  ): Promise<void> {
    await this.basketService.deleteUsersBasketItem(userId, basketItemId);
  }

  @Get('users/:userId/products-in-basket')
  @UseGuards(JwtAuthGuard, MatchUserIdParamGuard)
  @ApiOkResponse({ type: () => Product, isArray: true })
  getProductsInBasket(@Param() { userId }: UserPathDto): Promise<Product[]> {
    return this.basketService.getProductsInBasket(userId);
  }
}
