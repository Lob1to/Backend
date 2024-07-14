import { CreateOrderDto, OrderDatasource, OrderEntity, OrderRepository, UpdateOrderDto } from "../../../domain";

export class OrderRepositoryImpl implements OrderRepository {

    constructor(
        private readonly datasource: OrderDatasource,
    ) { }

    getOrders(): Promise<OrderEntity[]> {
        return this.datasource.getOrders();
    }

    getOrder(id: string): Promise<OrderEntity> {
        return this.datasource.getOrder(id);
    }

    getOrdersByUserId(userId: string): Promise<OrderEntity[]> {
        return this.datasource.getOrdersByUserId(userId);
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


