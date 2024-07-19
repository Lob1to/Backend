import { Request, Response } from "express";
import { CouponsRepository, LogRepository } from "../../domain";
import { ErrorsHandler } from "../handlers";

export class CouponsController {

    constructor(
        private couponsRepository: CouponsRepository,
        private logRepository: LogRepository
    ) { }

    createCoupon = (req: Request, res: Response) => {

        try {



        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    getCoupons = (req: Request, res: Response) => {

        try {



        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    getCoupon = (req: Request, res: Response) => {

        try {



        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    updateCoupon = (req: Request, res: Response) => {

        try {



        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    deleteCoupon = (req: Request, res: Response) => {

        try {



        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
    checkCoupon = (req: Request, res: Response) => {

        try {



        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
}



