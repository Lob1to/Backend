import { Request, Response } from "express";
import { VariantsRepository, LogRepository, CreateVariant, CreateVariantDto, PaginationDto, GetVariants, GetVariantsDto, GetVariant, DeleteVariant, UpdateVariant, UpdateVariantDto } from "../../domain";
import { ResponsesHandler, ErrorsHandler } from "../handlers";

export class VariantsController {

    constructor(
        private variantTypesRepository: VariantsRepository,
        private logRepository: LogRepository
    ) { }

    createVariant = (req: Request, res: Response) => {

        try {

            const [error, errorCode, createDto] = CreateVariantDto.create(req.body);

            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode!);

            new CreateVariant(this.variantTypesRepository, this.logRepository).execute(createDto!)
                .then(variant => ResponsesHandler.sendSuccessResponse(res, 'La variante se ha creado exitosamente', variant))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    getVariants = (req: Request, res: Response) => {

        try {

            const { page = 1, limit = 10 } = req.query;

            const [pagError, pagErrorCode, pagDto] = PaginationDto.create(+page, +limit);
            const [getError, getErrorCode, getVariantsDto] = GetVariantsDto.create(req.query);

            if (pagError) return ResponsesHandler.sendErrorResponse(res, 400, pagError, pagErrorCode!);
            if (getError) return ResponsesHandler.sendErrorResponse(res, 400, getError, getErrorCode!);

            new GetVariants(this.variantTypesRepository, this.logRepository).execute(pagDto!, getVariantsDto!)
                .then(variants => ResponsesHandler.sendSuccessResponse(res, 'Las variantes se han obtenido exitosamente', variants))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    getVariant = (req: Request, res: Response) => {

        try {

            const { id } = req.params;

            new GetVariant(this.variantTypesRepository, this.logRepository).execute(id)
                .then(variant => ResponsesHandler.sendSuccessResponse(res, 'La variante se ha obtenido exitosamente', variant))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    updateVariant = (req: Request, res: Response) => {

        try {

            const { id } = req.params;
            const [error, errorCode, updateDto] = UpdateVariantDto.create({ id, ...req.body });

            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode!);

            new UpdateVariant(this.variantTypesRepository, this.logRepository).execute(updateDto!)
                .then(variant => ResponsesHandler.sendSuccessResponse(res, 'La variante se ha actualizado exitosamente', variant))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    deleteVariant = (req: Request, res: Response) => {

        try {

            const { id } = req.params;

            new DeleteVariant(this.variantTypesRepository, this.logRepository).execute(id)
                .then(variant => ResponsesHandler.sendSuccessResponse(res, 'La variante se ha eliminado exitosamente', variant))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

}