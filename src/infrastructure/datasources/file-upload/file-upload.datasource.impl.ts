import { CustomError, FileEntity, FileUploadDatasource } from "../../../domain";
import { fileUploadErrors, auth, sharedErrors, envs } from "../../../config";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { UploadedFile } from "express-fileupload";

const { invalidImgExtension } = fileUploadErrors;
const { unauthorized } = sharedErrors;
export class FileUploadDatasourceImpl implements FileUploadDatasource {

    async firebaseSignIn(auth: Auth, email: string, password: string): Promise<void> {

        try {
            await signInWithEmailAndPassword(auth, email, password);

        } catch (error) {

            throw CustomError.unauthorized(unauthorized.message, unauthorized.code);

        }

    }

    async uploadSingleFile(file: UploadedFile, userId: string, type: string, validExtensions: string[] = ['jpg, jpeg, png']): Promise<FileEntity> {

        try {
            const storageFB = getStorage();
            await this.firebaseSignIn(auth, envs.FIREBASE_AUTH_EMAIL, envs.FIREBASE_AUTH_KEY);

            const fileExtension = file.mimetype.split('/').at(1) ?? '';

            if (!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(invalidImgExtension.message(fileExtension, validExtensions), invalidImgExtension.code);
            }

            const fileName = `${userId}-${Date.now()}.${fileExtension}`;
            const filePath = `${type}/${fileName}`;
            const storageRef = ref(storageFB, filePath);

            const metadata = {
                contentType: fileExtension,
            };
            await uploadBytesResumable(storageRef, file.data, metadata);

            const fileEntity = FileEntity.fromObject({
                name: fileName,
                path: filePath,
                imageUrl: `${envs.WEBSERVICE_URL}/images/${filePath}`,
                extension: fileExtension,
                size: file.size,
            });

            return fileEntity;

        } catch (error) {
            throw error;
        }


    }

    async uploadMultipleFiles(files: UploadedFile[], userId: string, type: string, validExtensions: string[] = ['jpg, jpeg, png']): Promise<FileEntity[]> {

        const fileEntities = await Promise.all(
            files.map((file) => this.uploadSingleFile(file, userId, type, validExtensions))
        );

        return fileEntities;

    }




}


