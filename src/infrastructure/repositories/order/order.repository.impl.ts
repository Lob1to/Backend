import { CreateOrderDto, OrderDatasource, OrderEntity, OrderRepository, PaginationDto, UpdateOrderDto } from "../../../domain";

export class OrderRepositoryImpl implements OrderRepository {

    constructor(
        private readonly datasource: OrderDatasource,
    ) { }

    getOrders(paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }> {
        return this.datasource.getOrders(paginationDto);
    }

    getOrder(id: string): Promise<OrderEntity> {
        return this.datasource.getOrder(id);
    }

    getOrdersByUserId(userId: string, paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }> {
        return this.datasource.getOrdersByUserId(userId, paginationDto);
    }

    createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        return this.datasource.createOrder(createOrderDto);
    }

    deleteOrder(id: string): Promise<OrderEntity> {
        return this.datasource.deleteOrder(id);
    }

    updateOrder(updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
        return this.datasource.updateOrder(updateOrderDto);
    }
}


