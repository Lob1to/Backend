import { CreateLog, LogSeverityLevel } from "../..";
import { fileUploadErrors, sharedErrors } from "../../../config";
import { CustomError } from "../../errors/custom-error";
import { GetImageRepository, LogRepository } from "../../repositories";

const { imageNotFound } = fileUploadErrors;
const { unknownError } = sharedErrors;

interface GetImageBufferUseCase {

    execute(type: string, img: string, id?: string): Promise<Buffer>;

}

export class GetImageBuffer implements GetImageBufferUseCase {

    constructor(
        private readonly getImageRepository: GetImageRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(type: string, img: string, id?: string): Promise<Buffer> {

        try {

            const imageBuffer = await this.getImageRepository.getImageBuffer(type, img, id);
            if (!imageBuffer) {
                throw CustomError.notFound(imageNotFound.message, imageNotFound.code);
            }

            return imageBuffer;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'get-image-buffer.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }



}
