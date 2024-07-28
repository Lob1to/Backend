import { sharedErrors } from "../../../config";
import { CouponEntity, LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CouponsRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";


interface GetCouponUseCase {
    execute(id: string): Promise<CouponEntity>;
}

const { unknownError } = sharedErrors;

export class GetCoupon implements GetCouponUseCase {

    constructor(
        private readonly couponsRepository: CouponsRepository,
        private readonly logRepository: LogRepository
    ) { }

    async execute(id: string): Promise<CouponEntity> {

        try {

            const coupon = await this.couponsRepository.getCoupon(id);

            return coupon;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-coupon.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }

    }



}