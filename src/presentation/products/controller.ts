import e, { Request, Response } from "express";
import { CreateProduct, CreateProductDto, DeleteProduct, GetProductById, GetProducts, GetProductsDto, LogRepository, PaginationDto, ProductsRepository, UpdateProduct, UpdateProductDto } from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";
import { sharedErrors } from "../../config";


const { missingId } = sharedErrors;

export class ProductsController {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    createProduct = (req: Request, res: Response) => {

        try {
            const [error, errorCode, createDto] = CreateProductDto.create(req.body);

            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            new CreateProduct(this.productsRepository, this.logRepository).execute(createDto!)
                .then(product => ResponsesHandler.sendSuccessResponse(res, 'El producto fue creado exitosamente', product))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error.message, error.code));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    }

    getProducts = (req: Request, res: Response) => {

        try {
            const { page = 1, limit = 10 } = req.query;

            const [getProductsError, getProductsErrorCode, getProductsDto] = GetProductsDto.create(req.query);
            if (getProductsError) return ResponsesHandler.sendErrorResponse(res, 400, getProductsError, getProductsErrorCode ?? 'bad-request');

            const [paginationError, paginationErrorCode, paginationDto] = PaginationDto.create(+page, +limit);
            if (paginationError) return ResponsesHandler.sendErrorResponse(res, 400, paginationError, paginationErrorCode ?? 'bad-request');

            new GetProducts(this.productsRepository, this.logRepository).execute(getProductsDto!, paginationDto!)
                .then(json => ResponsesHandler.sendSuccessResponse(res, 'Los productos fueron encontrados exitosamente', json))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error.message, error.code));


        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    }

    getProductById = (req: Request, res: Response) => {

        try {

            const id = req.params.id;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

            new GetProductById(this.productsRepository, this.logRepository).execute(id)
                .then(product => ResponsesHandler.sendSuccessResponse(res, 'El producto fue encontrado exitosamente', product))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error.message, error.code));


        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    }

    updateProduct = (req: Request, res: Response) => {
        try {

            const id = req.params.id;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

            const [error, errorCode, updateDto] = UpdateProductDto.create({ id, ...req.body });
            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            new UpdateProduct(this.productsRepository, this.logRepository).execute(updateDto!)
                .then(message => ResponsesHandler.sendSuccessResponse(res, message))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode ?? 500, error.message ?? 'Algo malo sucedio...', error.code));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    }

    deleteProduct = (req: Request, res: Response) => {

        try {

            const id = req.params.id;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

            new DeleteProduct(this.productsRepository, this.logRepository).execute(id)
                .then(message => ResponsesHandler.sendSuccessResponse(res, message))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error.message, error.code));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

}



