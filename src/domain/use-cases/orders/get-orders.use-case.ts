import { CreateLog, CustomError, LogRepository, OrderRepository } from "../..";
import { LogSeverityLevel, OrderEntity } from "../../entities";

interface GetOrdersUseCase {

    execute(): Promise<OrderEntity[]>;

}

export class GetOrders implements GetOrdersUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(): Promise<OrderEntity[]> {

        try {
            const orders = this.orderRepository.getOrders();
            return orders;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-orders.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');

        }

    }

}


