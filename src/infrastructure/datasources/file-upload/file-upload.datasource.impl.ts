import { CustomError, FileEntity, FileUploadDatasource } from "../../../domain";
import { fileUploadErrors, auth, sharedErrors, envs } from "../../../config";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
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

    async fileExists(type: string, imgPath: string, id: string | undefined): Promise<boolean> {

        try {
            let idRef = '';

            if (id) {
                idRef = `${id}/`
            };

            const storageFB = getStorage();

            const imageRef = ref(storageFB, `${type}/${idRef}${imgPath}`);

            const image = await getDownloadURL(imageRef);

            return !!image;

        } catch (error) {

            return false;
        }

    }

    async deleteFile(type: string, imgName: string, id: string): Promise<void> {

        try {
            let idRef = '';
            if (id) {
                idRef = `${id}/`
            }

            const storageFB = getStorage();

            await this.firebaseSignIn(auth, envs.FIREBASE_AUTH_EMAIL, envs.FIREBASE_AUTH_KEY);

            const desertRef = ref(storageFB, `${type}/${idRef}${imgName}`);

            await deleteObject(desertRef);


        } catch (error) {
            throw error;
        }

    }

    async uploadUserProfilePicture(file: any, id: string, validExtensions: string[]): Promise<FileEntity> {

        const name = 'profile-picture';
        const type = 'users';
        const extension = file.name.split('.')[1];

        const imgName = `${name}.${extension}`

        const fileExists = await this.fileExists(type, imgName, id);
        if (fileExists) {
            await this.deleteFile(type, imgName, id);
        }

        const profilePicture = await this.uploadSingleFile(name, file, id, type, validExtensions);

        return profilePicture;


    }

    async uploadProductPictures(files: any[], id: string, validExtensions: string[]): Promise<FileEntity[]> {

        let imagesCounter = 1;
        let images: FileEntity[] = [];

        for (const file of files) {

            const name = 'image-' + imagesCounter;
            const type = 'products';
            const fileExists = await this.fileExists(type, file.name, id);

            if (fileExists) {
                await this.deleteFile(type, file.name, id);
            }

            const productPicture = await this.uploadSingleFile(name, file, id, type, validExtensions);

            imagesCounter++;
            images.push(productPicture);
        }

        return images;

    }

    async uploadSingleFile(name: string, file: UploadedFile, id: string, type: string, validExtensions: string[] = ['jpg, jpeg, png']): Promise<FileEntity> {

        try {
            const storageFB = getStorage();
            await this.firebaseSignIn(auth, envs.FIREBASE_AUTH_EMAIL, envs.FIREBASE_AUTH_KEY);

            const fileExtension = file.mimetype.split('/').at(1) ?? '';

            if (!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(invalidImgExtension.message(fileExtension, validExtensions), invalidImgExtension.code);
            }

            const fileName = `${name}.${fileExtension}`;
            const filePath = `${type}/${id}/${fileName}`;
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

    async uploadMultipleFiles(files: UploadedFile[], id: string, type: string, validExtensions: string[] = ['jpg, jpeg, png']): Promise<FileEntity[]> {

        let counter = 1;

        const fileEntities = await Promise.all(
            files.map((file) => {
                const name = `image-${counter}`;
                counter++;

                return this.uploadSingleFile(name, file, id, type, validExtensions)
            })
        );

        return fileEntities;

    }




}


