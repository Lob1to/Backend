import { Request, Response } from "express";
import { ErrorsHandler, ResponsesHandler } from "../handlers";
import { SubcategoriesRepository, CreateSubcategory, GetSubcategories, LogRepository, CreateSubcategoryDto, UpdateSubcategoryDto, UpdateSubcategory, DeleteSubcategory, PaginationDto } from "../../domain";


export class SubcategoriesController {

    //* D.I
    constructor(
        private readonly subcategoriesRepository: SubcategoriesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    createSubcategory = (req: Request, res: Response) => {

        const [error, errorCode, createDto] = CreateSubcategoryDto.create(req.body);
        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new CreateSubcategory(this.subcategoriesRepository, this.logRepository).execute(createDto!)
                .then(subcategory => ResponsesHandler.sendSuccessResponse(res, `La subcategoria ${subcategory.name} ha sido creada correctamente`, subcategory))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    getSubcategories = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, errorCode, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new GetSubcategories(this.subcategoriesRepository, this.logRepository).execute(paginationDto!)
                .then(subcategories => ResponsesHandler.sendSuccessResponse(res, `Subcategorias obtenidas correctamente`, subcategories))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    updateSubcategory = (req: Request, res: Response) => {

        const id = req.params.id;
        const [error, errorCode, updateDto] = UpdateSubcategoryDto.create({ id, ...req.body });
        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new UpdateSubcategory(this.subcategoriesRepository, this.logRepository).execute(updateDto!)
                .then(subcategory => ResponsesHandler.sendSuccessResponse(res, `La subcategoria ${subcategory.name} ha sido actualizada correctamente`, subcategory))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {

            return ErrorsHandler.handleUnknownError(res);
        }

    }

    deleteSubcategory = (req: Request, res: Response) => {

        const id = req.params.id;
        if (!id) return ResponsesHandler.sendErrorResponse(res, 400, 'El id es requerido', 'bad-request');

        try {

            new DeleteSubcategory(this.subcategoriesRepository, this.logRepository).execute(id)
                .then(subcategory => ResponsesHandler.sendSuccessResponse(res, `La subcategoria ${subcategory.name} ha sido eliminada correctamente`, subcategory))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
}



