import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UploadProfilePicture, UploadSingleFile, UploadMultipleFiles, FileUploadRepository, LogRepository, UploadProductImages, CustomError, ProductsRepository, AuthRepository } from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";


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
            if (files.length > 5) return ResponsesHandler.sendErrorResponse(res, 400, 'No se pueden subir más de 5 imágenes', 'too-many-files');
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

            if (!name) return ResponsesHandler.sendErrorResponse(res, 400, 'Debe enviar el nombre de la imagen', 'missing-image-name');

            const file = req.body.files[0] as UploadedFile;
            const userId = req.body.user.id;

            new UploadSingleFile(this.fileUploadRepository, this.logRepository).execute(name, file, userId, type)
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
            if (files.length > 5) throw CustomError.badRequest('No se pueden subir mas de 5 imagenes', 'too-many-images');
            const userId = req.body.user.id;

            new UploadMultipleFiles(this.fileUploadRepository, this.logRepository).execute(files, userId, type)
                .then(files => ResponsesHandler.sendSuccessResponse(res, 'Imagenes subidas correctamente', files))
                .catch(error => ErrorsHandler.handleErrors(res, error));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

}


