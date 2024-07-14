import { CreateLog, CustomError, LogRepository, OrderRepository, PaginationDto } from "../..";
import { LogSeverityLevel, OrderEntity } from "../../entities";

interface GetOrdersUseCase {

    execute(paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }>;

}

export class GetOrders implements GetOrdersUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }> {

        try {
            const orders = await this.orderRepository.getOrders(paginationDto);

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


