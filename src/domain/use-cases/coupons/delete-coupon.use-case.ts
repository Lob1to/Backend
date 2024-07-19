import { CouponEntity, LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CouponsRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface DeleteCouponUseCase {

    execute(id: string): Promise<CouponEntity>;

}

export class DeleteCoupon implements DeleteCouponUseCase {

    constructor(
        private readonly couponsRepository: CouponsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(id: string): Promise<CouponEntity> {

        try {

            const coupon = this.couponsRepository.deleteCoupon(id);
            return coupon;


        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-coupon.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }

    }


}

