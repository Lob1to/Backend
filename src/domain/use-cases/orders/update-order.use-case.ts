import { sharedErrors } from "../../../config";
import { UpdateOrderDto } from "../../dtos";
import { LogSeverityLevel, OrderEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { OrderRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface UpdateOrderUseCase {

    execute(updateDto: UpdateOrderDto): Promise<OrderEntity>;

}

const { unknownError } = sharedErrors;

export class UpdateOrder implements UpdateOrderUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(updateDto: UpdateOrderDto): Promise<OrderEntity> {

        try {
            const order = this.orderRepository.updateOrder(updateDto);
            return order;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-order.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }

    }

}


