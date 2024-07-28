import { sharedErrors } from "../../../config";
import { CreateCouponDto } from "../../dtos";
import { CouponEntity, LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CouponsRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";


interface CreateCouponUseCase {
    execute(createCouponDto: CreateCouponDto): Promise<CouponEntity>;
}

const { unknownError } = sharedErrors;

export class CreateCoupon implements CreateCouponUseCase {

    constructor(
        private readonly couponsRepository: CouponsRepository,
        private readonly logRepository: LogRepository
    ) { }

    async execute(createCouponDto: CreateCouponDto): Promise<CouponEntity> {

        try {
            const coupon = await this.couponsRepository.createCoupon(createCouponDto);

            return coupon;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'create-coupon.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }



}