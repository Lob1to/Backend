import { Request, Response } from "express";
import { VariantTypesRepository, LogRepository, CreateVariantTypeDto, CreateVariantType, GetVariantType, PaginationDto, GetVariantTypesDto, GetVariantTypes, UpdateVariantTypeDto, UpdateVariantType, DeleteVariantType } from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";

export class VariantTypesController {


    constructor(
        private variantTypesRepository: VariantTypesRepository,
        private logRepository: LogRepository
    ) { }

    createVariantType = (req: Request, res: Response) => {

        try {

            const [error, errorCode, createDto] = CreateVariantTypeDto.create(req.body);

            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode!);

            new CreateVariantType(this.variantTypesRepository, this.logRepository).execute(createDto!)
                .then(variantType => ResponsesHandler.sendSuccessResponse(res, 'El tipo de variante se ha creado exitosamente', variantType))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    getVariantType = (req: Request, res: Response) => {

        try {

            const { id } = req.params;

            new GetVariantType(this.variantTypesRepository, this.logRepository).execute(id)
                .then(variantType => ResponsesHandler.sendSuccessResponse(res, 'El tipo de variante se ha obtenido exitosamente', variantType))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    getVariantTypes = (req: Request, res: Response) => {

        try {

            const { page = 1, limit = 10 } = req.query;

            const [pagError, pagErrorCode, pagDto] = PaginationDto.create(+page, +limit);
            const [getError, getErrorCode, getVariantTypesDto] = GetVariantTypesDto.create(req.query);

            if (pagError) return ResponsesHandler.sendErrorResponse(res, 400, pagError, pagErrorCode!);
            if (getError) return ResponsesHandler.sendErrorResponse(res, 400, getError, getErrorCode!);

            new GetVariantTypes(this.variantTypesRepository, this.logRepository).execute(pagDto!, getVariantTypesDto!)
                .then(variantTypes => ResponsesHandler.sendSuccessResponse(res, 'Los tipos de variante se han obtenido exitosamente', variantTypes))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    updateVariantType = (req: Request, res: Response) => {

        try {

            const { id } = req.params;
            const [error, errorCode, updateDto] = UpdateVariantTypeDto.create({ id, ...req.body });

            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode!);

            new UpdateVariantType(this.variantTypesRepository, this.logRepository).execute(updateDto!)
                .then(variantType => ResponsesHandler.sendSuccessResponse(res, 'El tipo de variante se ha actualizado exitosamente', variantType))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    deleteVariantType = (req: Request, res: Response) => {

        try {

            const { id } = req.params;

            new DeleteVariantType(this.variantTypesRepository, this.logRepository).execute(id)
                .then(variantType => ResponsesHandler.sendSuccessResponse(res, 'El tipo de variante se ha eliminado exitosamente', variantType))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }


    }

}