import { UpdateCouponDto } from "../../dtos";
import { CouponEntity, LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CouponsRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";


interface UpdateCouponUseCase {

    execute(updateCouponDto: UpdateCouponDto): Promise<CouponEntity>;

}

export class UpdateCoupon implements UpdateCouponUseCase {

    constructor(
        private readonly couponsRepository: CouponsRepository,
        private readonly logRepository: LogRepository,

    ) { }


    execute(updateCouponDto: UpdateCouponDto): Promise<CouponEntity> {

        try {

            const coupon = this.couponsRepository.updateCoupon(updateCouponDto);

            return coupon;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-coupon.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');

        }

    }


}