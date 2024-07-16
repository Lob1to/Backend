import { UploadedFile } from "express-fileupload";
import { FileEntity, LogSeverityLevel } from "../../entities";
import { AuthRepository, FileUploadRepository, LogRepository } from "../../repositories";
import { CustomError } from "../../errors/custom-error";
import { CreateLog } from "../logs/create-log.use-case";
import { sharedErrors } from "../../../config";
import { UpdateUserDto } from "../../dtos";
import { UpdateUser } from "../auth/update-user.use-case";

interface UploadProfilePictureUseCase {

    execute(file: UploadedFile, userId: string, validExtensions: string[]): Promise<FileEntity>;

}

const { unknownError } = sharedErrors;

export class UploadProfilePicture implements UploadProfilePictureUseCase {

    constructor(
        private fileUploadRepository: FileUploadRepository,
        private authRepository: AuthRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(file: UploadedFile, userId: string, validExtensions: string[] = ['jpg', 'jpeg', 'png']): Promise<FileEntity> {

        try {

            let isUpdated = false;

            const fileUploaded = await this.fileUploadRepository.uploadUserProfilePicture(file, userId, validExtensions);

            const [error, errorCode, updateDto] = UpdateUserDto.create({
                id: userId,
                img: fileUploaded.imageUrl
            });

            if (error) throw CustomError.badRequest(error, errorCode!);


            new UpdateUser(this.authRepository, this.logRepository).execute(updateDto!)
                .then(updatedUser => isUpdated = !!updatedUser)
                .catch(error => Error(error));

            if (!isUpdated) throw Error('El usuario no se ha actualizado');

            return fileUploaded;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'upload-profile-picture.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }


    }

}


