import { NextFunction, Request, Response } from "express";
import { JwtAdapter, authErrors, sharedErrors } from "../../config";
import { UserModel } from "../../data/mongo";
import { UserEntity } from "../../domain";
import { ResponsesHandler } from "../handlers";



const { missingToken, invalidToken, unknownError } = authErrors;
const { invalidBearer, unauthorized } = sharedErrors;

export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {


        const authorization = req.header('Authorization');

        if (!authorization) {
            return ResponsesHandler.sendErrorResponse(res, 400, missingToken.message, missingToken.code);
        }

        if (!authorization!.startsWith('Bearer ')) {
            return ResponsesHandler.sendErrorResponse(res, 400, invalidBearer.message, invalidBearer.code);
        }

        const token = authorization!.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string, role: string[], tokenType: string }>(token);
            if (!payload) {
                return ResponsesHandler.sendErrorResponse(res, 401, invalidToken.message, invalidToken.code);
            }

            if (payload.tokenType !== 'access-token') return ResponsesHandler.sendErrorResponse(res, 401, invalidToken.message, invalidToken.code);

            const user = await UserModel.findById(payload!.id);

            if (!user) {
                return ResponsesHandler.sendErrorResponse(res, 401, unauthorized.message, unauthorized.code);
            }

            const { password, ...data } = UserEntity.fromObject(user!);

            req.body.user = data;

            next();

        } catch (error) {
            return res.status(500).json({ success: false, message: unknownError.message, errorCode: unknownError.code });
        }




    }

    static async validateAdminRoleWithToken(req: Request, res: Response, next: NextFunction) {

        const authorization = req.header('Authorization');

        if (!authorization) {
            return ResponsesHandler.sendErrorResponse(res, 400, missingToken.message, missingToken.code);
        }

        if (!authorization!.startsWith('Bearer ')) {
            return ResponsesHandler.sendErrorResponse(res, 400, invalidBearer.message, invalidBearer.code);
        }

        const token = authorization!.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string, role: string[], tokenType: string }>(token);
            if (!payload) {
                return ResponsesHandler.sendErrorResponse(res, 401, invalidToken.message, invalidToken.code);
            }

            if (payload.tokenType !== 'access-token') return ResponsesHandler.sendErrorResponse(res, 401, unauthorized.message, unauthorized.code);

            const user = await UserModel.findById(payload!.id);

            if (!user) {
                return ResponsesHandler.sendErrorResponse(res, 401, unauthorized.message, unauthorized.code);
            }

            //* Validar si el rol del usuario es de administrador

            if (user!.role.at(0) !== 'ADMIN_ROLE') {
                return ResponsesHandler.sendErrorResponse(res, 401, unauthorized.message, unauthorized.code);
            }

            req.body.user = UserEntity.fromObject(user!);

            next();

        } catch (error) {
            return res.status(500).json({ success: false, message: unknownError.message, errorCode: unknownError.code });
        }

    }



}

