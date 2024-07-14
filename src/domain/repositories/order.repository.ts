import { CreateOrderDto, UpdateOrderDto } from "../dtos/";
import { OrderEntity } from "../entities/";


export abstract class OrderRepository {

    abstract getOrders(): Promise<OrderEntity[]>;
    abstract getOrder(id: string): Promise<OrderEntity>;
    abstract getOrdersByUserId(userId: string): Promise<OrderEntity[]>;
    abstract createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    abstract deleteOrder(id: string): Promise<OrderEntity>;
    abstract updateOrder(updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;

}

