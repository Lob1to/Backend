import { CreateLog, CustomError } from "../..";
import { sharedErrors } from "../../../config";
import { LogSeverityLevel, OrderEntity } from "../../entities";
import { OrderRepository, LogRepository } from "../../repositories";

interface DeleteOrderUseCase {

    execute(id: string): Promise<OrderEntity>

}

const { unknownError } = sharedErrors;

export class DeleteOrder implements DeleteOrderUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(id: string): Promise<OrderEntity> {


        try {

            const order = this.orderRepository.deleteOrder(id);

            return order;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-order.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}


