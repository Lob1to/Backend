import { Response } from "express";


export class ResponsesHandler {

    static sendSuccessResponse(res: Response, message: string, data: any = null) {

        return res.status(200).json({ success: true, message, data });
    }

    static sendErrorResponse(res: Response, statusCode: number, message: string, code: string) {

        return res
            .status(statusCode)
            .json({
                success: false,
                message: message,
                errorCode: code,
            });
    }

}