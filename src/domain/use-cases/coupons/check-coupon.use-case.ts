import { sharedErrors } from "../../../config";
import { CheckCouponDto } from "../../dtos";
import { LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CouponsRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface CheckCouponUseCase {

    execute(checkCouponDto: CheckCouponDto): Promise<void>;

}

const { unknownError } = sharedErrors;

export class CheckCoupon implements CheckCouponUseCase {

    constructor(
        private readonly couponsRepository: CouponsRepository,
        private readonly logRepository: LogRepository,
    ) { }


    async execute(checkCouponDto: CheckCouponDto): Promise<void> {

        try {
            await this.couponsRepository.checkCoupon(checkCouponDto);

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

