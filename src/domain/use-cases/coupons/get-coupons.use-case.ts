import { GetCouponsDto, PaginationDto } from "../../dtos";
import { CouponEntity, LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CouponsRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";


interface GetCouponsUseCase {
    execute(paginationDto: PaginationDto, getCouponsDto: GetCouponsDto): Promise<{ [key: string]: any | CouponEntity[] }>;
}

export class GetCoupons implements GetCouponsUseCase {

    constructor(
        private readonly couponsRepository: CouponsRepository,
        private readonly logRepository: LogRepository
    ) { }

    async execute(paginationDto: PaginationDto, getCouponsDto: GetCouponsDto): Promise<{ [key: string]: any | CouponEntity[] }> {

        try {

            const coupons = await this.couponsRepository.getCoupons(paginationDto, getCouponsDto);

            return coupons;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-coupons.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');

        }

    }



}