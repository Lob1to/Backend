import { CreateLog, LogSeverityLevel } from "../..";
import { fileUploadErrors, sharedErrors } from "../../../config";
import { CustomError } from "../../errors/custom-error";
import { GetImageRepository, LogRepository } from "../../repositories";

const { imageNotFound } = fileUploadErrors;
const { unknownError } = sharedErrors;

interface GetImageUrlUseCase {

    execute(type: string, img: string, id?: string): Promise<ArrayBuffer>;

}

export class GetImageUrl implements GetImageUrlUseCase {

    constructor(
        private readonly getImageRepository: GetImageRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(type: string, img: string, id?: string): Promise<ArrayBuffer> {

        try {

            const image = await this.getImageRepository.getImageBuffer(type, img, id);
            if (!image) {
                throw CustomError.notFound(imageNotFound.message, imageNotFound.code);
            }

            return image;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'get-image-url.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }



}
