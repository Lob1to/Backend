import { CreateLog, CreateOrderDto, CustomError, LogRepository, LogSeverityLevel, OrderEntity, OrderRepository } from "../..";
import { sharedErrors } from "../../../config";

interface CreateOrderUseCase {

    execute(createDto: CreateOrderDto): Promise<OrderEntity>;

}

const { unknownError } = sharedErrors;

export class CreateOrder implements CreateOrderUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(createDto: CreateOrderDto): Promise<OrderEntity> {

        try {
            const order = this.orderRepository.createOrder(createDto);

            return order;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'create-order.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}


