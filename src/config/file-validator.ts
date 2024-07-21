import { UploadedFile } from "express-fileupload";
import { CustomError } from "../domain";
import { fileUploadErrors } from ".";

const { invalidImgExtension, invalidImgSize } = fileUploadErrors;

export class FileValidator {
    static validateFile(file: UploadedFile, validExtensions: string[], maxSize: number) {
        const fileExtension = file.mimetype.split('/').pop()?.toLowerCase();

        if (!fileExtension || !validExtensions.includes(fileExtension)) {
            throw CustomError.badRequest(invalidImgExtension.message(fileExtension!, validExtensions), invalidImgExtension.code);
        }

        if (file.size > maxSize) {
            throw CustomError.badRequest(invalidImgSize.message(maxSize), invalidImgSize.code);
        }
    }
}
