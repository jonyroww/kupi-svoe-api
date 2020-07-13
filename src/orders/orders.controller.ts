import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/User.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/Order.entity';
import { UserPathDto } from '../users/dto/UserPath.dto';
import { MatchUserIdParamGuard } from '../common/guards/match-user-id-param.guard';
import { Paginated } from '../common/interfaces/paginated-entity.interface';
import { GetOrdersDto } from './dto/get-all-user-orders.dto';
import { GetOneOrderParamDto } from './dto/get-one-order.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiTags('Orders')
  @ApiCreatedResponse({ type: () => Order })
  @UseGuards(AuthGuard('jwt'), MatchUserIdParamGuard)
  @ApiBearerAuth()
  @Post('users/:userId/orders')
  createOrder(
    @Body() body: CreateOrderDto,
    @GetUser() orderCreator: User,
    @Param() { userId }: UserPathDto,
  ): Promise<Order> {
    return this.orderService.createOrder(body, orderCreator, userId);
  }

  @ApiTags('Orders')
  @ApiOkResponse({ type: () => Order })
  @UseGuards(AuthGuard('jwt'), MatchUserIdParamGuard)
  @ApiBearerAuth()
  @Get('users/:userId/orders')
  getUserOrders(
    @Query() query: GetOrdersDto,
    @Param() { userId }: UserPathDto,
  ): Promise<Paginated<Order>> {
    return this.orderService.getUserOrders(query, userId);
  }

  @ApiTags('Orders')
  @ApiOkResponse({ type: () => Order })
  @UseGuards(AuthGuard('jwt'), MatchUserIdParamGuard)
  @ApiBearerAuth()
  @Get('users/:userId/orders/:orderId')
  getOneOrder(@Param() params: GetOneOrderParamDto): Promise<Order> {
    return this.orderService.getOneOrder(params);
  }
}
