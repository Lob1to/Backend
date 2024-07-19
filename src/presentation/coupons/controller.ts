import { Request, Response } from "express";
import { CheckCoupon, CheckCouponDto, CouponsRepository, CreateCoupon, CreateCouponDto, DeleteCoupon, GetCoupon, GetCoupons, GetCouponsDto, LogRepository, PaginationDto, UpdateCoupon, UpdateCouponDto } from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";
import { sharedErrors } from "../../config";

const { missingId } = sharedErrors;

export class CouponsController {

    constructor(
        private couponsRepository: CouponsRepository,
        private logRepository: LogRepository
    ) { }

    createCoupon = (req: Request, res: Response) => {

        try {
            const [error, errorCode, createDto] = CreateCouponDto.create(req.body);
            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request')

            new CreateCoupon(this.couponsRepository, this.logRepository).execute(createDto!)
                .then(coupon => ResponsesHandler.sendSuccessResponse(res, 'Cupón de descuento creado con éxito', coupon))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    getCoupons = (req: Request, res: Response) => {

        try {
            const { page = 1, limit = 10, ...params } = req.params;
            const [pagErr, pagErrCode, paginationDto] = PaginationDto.create(+page, +limit);
            if (pagErr) return ResponsesHandler.sendErrorResponse(res, 400, pagErr, pagErrCode ?? 'bad-request');

            const [getCoupErr, getCoupErrCode, getCouponsDto] = GetCouponsDto.create(params);
            if (getCoupErr) return ResponsesHandler.sendErrorResponse(res, 400, getCoupErr, getCoupErrCode ?? 'bad-request');

            new GetCoupons(this.couponsRepository, this.logRepository).execute(paginationDto!, getCouponsDto!)
                .then(coupons => ResponsesHandler.sendSuccessResponse(res, 'Cupones de descuento encontrados', coupons))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    getCoupon = (req: Request, res: Response) => {

        try {
            const { id } = req.params;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

            new GetCoupon(this.couponsRepository, this.logRepository).execute(id)
                .then(coupon => ResponsesHandler.sendSuccessResponse(res, `El cupón con ID ${id} se ha encontrado`, coupon))
                .catch(error => ErrorsHandler.handleErrors(error, res));


        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    updateCoupon = (req: Request, res: Response) => {

        try {
            const { id } = req.params;

            const [error, errorCode, updateDto] = UpdateCouponDto.create({ id, ...req.body });
            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            new UpdateCoupon(this.couponsRepository, this.logRepository).execute(updateDto!)
                .then(coupon => ResponsesHandler.sendSuccessResponse(res, 'El cupón se ha actualizado correctamente', coupon))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    deleteCoupon = (req: Request, res: Response) => {

        try {

            const { id } = req.params;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

            new DeleteCoupon(this.couponsRepository, this.logRepository).execute(id)
                .then(coupon => ResponsesHandler.sendSuccessResponse(res, 'El cupón se ha eliminado correctamente', coupon))
                .catch(error => ErrorsHandler.handleErrors(error, res));



        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    checkCoupon = (req: Request, res: Response) => {

        try {

            const [error, errorCode, checkCouponDto] = CheckCouponDto.create(req.body);
            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            new CheckCoupon(this.couponsRepository, this.logRepository).execute(checkCouponDto!)
                .then((_) => ResponsesHandler.sendSuccessResponse(res, 'The coupon is valid for all products'))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
}



