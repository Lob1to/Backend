import { CreateLog, CustomError, LogRepository, OrderRepository } from "../..";
import { LogSeverityLevel, OrderEntity } from "../../entities";


interface GetOrdersByUserIdUseCase {

    execute(userId: string): Promise<OrderEntity[]>;

}

export class GetOrdersByUserId implements GetOrdersByUserIdUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(userId: string): Promise<OrderEntity[]> {

        try {
            const orders = this.orderRepository.getOrdersByUserId(userId);
            return orders;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-orders-by-userid.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');

        }

    }

}




