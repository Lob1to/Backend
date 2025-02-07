import { UploadedFile } from "express-fileupload";
import { CustomError } from "../domain";
import { fileUploadErrors } from ".";

const { invalidImgExtension, invalidImgSize } = fileUploadErrors;

export class FileValidator {
    /**
 * Validates an uploaded file to ensure it meets the specified requirements.
 * 
 * @param file The uploaded file to validate.
 * @param validExtensions An array of valid file extensions.
 * @param maxSize The maximum allowed file size in bytes.
 * @throws {CustomError} If the file is invalid, with a message and code indicating the reason.
 */
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
