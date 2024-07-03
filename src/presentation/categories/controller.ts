import { Request, Response } from "express";
import { ErrorsHandler, ResponsesHandler } from "../handlers";
import { CategoriesRepository, CreateCategory, GetCategories, LogRepository, CreateCategoryDto, UpdateCategoryDto, UpdateCategory, DeleteCategory, PaginationDto } from "../../domain";
import mongoose from "mongoose";


export class CategoriesController {

    //* D.I
    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    createCategory = (req: Request, res: Response) => {

        const [error, errorCode, createDto] = CreateCategoryDto.create(req.body);
        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new CreateCategory(this.categoriesRepository, this.logRepository).execute(createDto!)
                .then(category => ResponsesHandler.sendSuccessResponse(res, 'Category created', category))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    getAllCategories = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, errorCode, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new GetCategories(this.categoriesRepository, this.logRepository).execute(paginationDto!)
                .then(data => ResponsesHandler.sendSuccessResponse(res, 'Categories found', data))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    updateCategory = (req: Request, res: Response) => {

        const id = req.params.id;
        const [error, errorCode, updateDto] = UpdateCategoryDto.create({ id, ...req.body });
        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new UpdateCategory(this.categoriesRepository, this.logRepository).execute(updateDto!)
                .then(category => ResponsesHandler.sendSuccessResponse(res, 'Category updated', category))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {

            return ErrorsHandler.handleUnknownError(res);
        }

    }

    deleteCategory = (req: Request, res: Response) => {

        const id = req.params.id;
        if (!id) return ResponsesHandler.sendErrorResponse(res, 400, 'Id is required', 'bad-request');

        try {

            new DeleteCategory(this.categoriesRepository, this.logRepository).execute(id)
                .then(message => ResponsesHandler.sendSuccessResponse(res, message))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }
}



