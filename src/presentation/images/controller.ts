import { Request, Response } from "express";
import { ErrorsHandler, ResponsesHandler } from "../handlers";
import { GetImageUrl, GetImageRepository, LogRepository } from "../../domain";

export class ImagesController {

    constructor(
        private readonly getImageRepository: GetImageRepository,
        private readonly logRepository: LogRepository,

    ) { }


    getImage = (req: Request, res: Response) => {

        try {

            const { type, id, img } = req.params;

            if (!type || !img) return ResponsesHandler.sendErrorResponse(res, 400, 'Debe enviar el tipo y el nombre de la imagen', 'invalid-image-params');
            const extension = img.split('.')[1];

            new GetImageUrl(this.getImageRepository, this.logRepository).execute(type, img, id)
                .then(arrayBuffer => {
                    const image = Buffer.from(arrayBuffer).toString('base64');

                    res.setHeader('Content-Type', `image/${extension}`);
                    res.end(image, 'base64');

                })
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

}