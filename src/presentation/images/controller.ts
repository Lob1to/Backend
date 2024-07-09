import { Request, Response } from "express";
import { ErrorsHandler } from "../handlers";
import { GetImageUrl, GetImageRepository, LogRepository } from "../../domain";

export class ImagesController {

    constructor(
        private readonly getImageRepository: GetImageRepository,
        private readonly logRepository: LogRepository,

    ) { }


    getImage = (req: Request, res: Response) => {

        try {

            const { type = '', img = '' } = req.params;
            const extension = img.split('.')[1];

            new GetImageUrl(this.getImageRepository, this.logRepository).execute(type, img)
                .then(arrayBuffer => {
                    const image = Buffer.from(arrayBuffer).toString('base64');

                    res.setHeader('Content-Type', `image/${extension}`);
                    res.end(image, 'base64');

                })
                .catch(error => ErrorsHandler.handleErrors(res, error));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

}