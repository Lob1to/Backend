import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UploadProfilePicture, UploadSingleFile, UploadMultipleFiles, FileUploadRepository, LogRepository, UploadProductImages, CustomError, ProductsRepository, AuthRepository, DeleteProductImage } from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";
import { fileUploadErrors, sharedErrors } from "../../config";

const { missingImgName, tooManyFiles } = fileUploadErrors;
const { missingId, invalidId } = sharedErrors;

export class FileUploadController {

    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        private readonly productsRepository: ProductsRepository,
        private readonly authRepository: AuthRepository,
        private readonly logRepository: LogRepository,
    ) { }

    uploadUserProfilePicture = (req: Request, res: Response) => {

        try {

            const file = req.body.files[0] as UploadedFile;
            const userId = req.body.user.id;

            new UploadProfilePicture(this.fileUploadRepository, this.authRepository, this.logRepository).execute(file, userId)
                .then(file => ResponsesHandler.sendSuccessResponse(res, `Imagen de perfil de ${req.body.user.name} subida correctamente`, { ...file })
                )
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

    uploadProductPictures = (req: Request, res: Response) => {

        try {

            const files = req.body.files as UploadedFile[];
            if (files.length > 5) return ResponsesHandler.sendErrorResponse(res, 400, tooManyFiles.message, tooManyFiles.code);
            const productId = req.params.id;

            new UploadProductImages(this.fileUploadRepository, this.productsRepository, this.logRepository).execute(files, productId)
                .then(files => ResponsesHandler.sendSuccessResponse(res, `Imagenes del producto con ID: ${productId} subidas correctamente`, files)
                )
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

    uploadSingleFile = (req: Request, res: Response) => {

        try {

            const type = req.params.type;
            const name = req.body.name;
            const id = req.params.id;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);
            if (id.length < 24) return ResponsesHandler.sendErrorResponse(res, 400, invalidId.message, invalidId.code);

            if (!name) return ResponsesHandler.sendErrorResponse(res, 400, missingImgName.message, missingImgName.code);

            const file = req.body.files[0] as UploadedFile;

            new UploadSingleFile(this.fileUploadRepository, this.logRepository).execute(name, file, id, type)
                .then(file => ResponsesHandler.sendSuccessResponse(res, 'Imagen subida correctamente', file))
                .catch(error => ErrorsHandler.handleErrors(res, error));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

    uploadMultipleFiles = (req: Request, res: Response) => {

        try {

            const type = req.params.type;
            const files = req.body.files as UploadedFile[];
            if (files.length > 5) throw CustomError.badRequest(tooManyFiles.message, tooManyFiles.code);
            const userId = req.body.user.id;

            new UploadMultipleFiles(this.fileUploadRepository, this.logRepository).execute(files, userId, type)
                .then(files => ResponsesHandler.sendSuccessResponse(res, 'Imagenes subidas correctamente', files))
                .catch(error => ErrorsHandler.handleErrors(res, error));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

    deleteProductImage = (req: Request, res: Response) => {
        // '/products/:id/delete/:img'
        try {

            const productId = req.params.id;
            const img = req.params.img;

            new DeleteProductImage(this.fileUploadRepository, this.productsRepository, this.logRepository).execute(productId, img)
                .then(_ => ResponsesHandler.sendSuccessResponse(res, `Imagen del producto con ID: ${productId} eliminada correctamente`))
                .catch(error => ErrorsHandler.handleErrors(error, res));


        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

}


