import { CreateLog, CustomError, LogRepository, OrderRepository, PaginationDto } from "../..";
import { sharedErrors } from "../../../config";
import { LogSeverityLevel, OrderEntity } from "../../entities";


interface GetOrdersByUserIdUseCase {

    execute(userId: string, paginationDto: PaginationDto): Promise<{ [key: string]: any } | OrderEntity[]>;

}

const { unknownError } = sharedErrors;

export class GetOrdersByUserId implements GetOrdersByUserIdUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(userId: string, paginationDto: PaginationDto): Promise<{ [key: string]: any } | OrderEntity[]> {

        try {
            const orders = this.orderRepository.getOrdersByUserId(userId, paginationDto);
            return orders;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-orders-by-userid.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }

    }

}




