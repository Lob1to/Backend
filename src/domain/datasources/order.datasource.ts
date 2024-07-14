import { CreateOrderDto, PaginationDto, UpdateOrderDto } from "../dtos/";
import { OrderEntity } from "../entities/";


export abstract class OrderDatasource {

    abstract getOrders(paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }>;
    abstract getOrder(id: string): Promise<OrderEntity>;
    abstract getOrdersByUserId(userId: string, paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }>;
    abstract createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    abstract deleteOrder(id: string): Promise<OrderEntity>;
    abstract updateOrder(updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;

}

