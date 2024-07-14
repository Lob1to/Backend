import { CreateLog, CustomError, LogRepository, LogSeverityLevel, OrderEntity, OrderRepository } from "../..";

interface GetOrderUseCase {

    execute(id: string): Promise<OrderEntity>;

}

export class GetOrder implements GetOrderUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(id: string): Promise<OrderEntity> {

        try {
            const order = this.orderRepository.getOrder(id);
            return order;
        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-order.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }

    }

}


