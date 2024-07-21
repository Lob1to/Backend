import { CustomError, FileEntity, FileUploadDatasource } from "../../../domain";
import { UploadQueue, FileValidator, CacheAdapter, fileUploadErrors, auth, sharedErrors, envs, validators, authErrors, productsErrors, ImageCompressor } from "../../../config";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { UploadedFile } from "express-fileupload";
import { isValidObjectId } from "mongoose";
import { ProductModel, UserModel } from "../../../data/mongo";

const { userNotFound } = authErrors;
const { productNotFound } = productsErrors;
const { unauthorized } = sharedErrors;

export class FileUploadDatasourceImpl implements FileUploadDatasource {

    private uploadQueue: UploadQueue;

    constructor() {
        this.uploadQueue = new UploadQueue();
    }

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

    async deleteProductImage(type: string, imgName: string, id: string): Promise<void> {

        try {
            const product = await ProductModel.findById(id);
            const imageName = imgName.split('.')[0];

            if (!product) throw CustomError.badRequest(productNotFound.message, productNotFound.code);
            await this.checkIfImageExistsAndDelete(type, imageName, ['png', 'jpg', 'jpeg'], id);

        } catch (error) {
            throw error;
        }

    }

    async checkIfImageExistsAndDelete(type: string, name: string, validExtensions: string[], id: string): Promise<void> {

        for (let i = 0; i < validExtensions.length; i++) {
            const img = `${name}.${validExtensions[i]}`;

            const file = await this.fileExists(type, img, id);

            if (file) await this.deleteFile(type, img, id);
        }

    }

    async uploadUserProfilePicture(file: any, id: string, validExtensions: string[]): Promise<FileEntity> {

        const name = 'profile-picture';
        const type = 'users';

        // Elimina todas las fotos de perfil con la extension valida.
        if (!isValidObjectId(id)) throw CustomError.badRequest(userNotFound.message, userNotFound.code);
        const user = await UserModel.findById(id);

        if (!user) throw CustomError.badRequest(userNotFound.message, userNotFound.code);

        await this.checkIfImageExistsAndDelete(type, name, validExtensions, id);

        const profilePicture = await this.uploadSingleFile(name, file, id, type, validExtensions);

        return profilePicture;


    }

    async uploadProductPictures(files: any[], id: string, validExtensions: string[]): Promise<FileEntity[]> {

        let imagesCounter = 1;
        let images: FileEntity[] = [];

        if (!isValidObjectId(id)) throw CustomError.badRequest(productNotFound.message, productNotFound.code);

        const product = await ProductModel.findById(id);

        if (!product) throw CustomError.badRequest(productNotFound.message, productNotFound.code);

        for (const file of files) {

            const productPicture = await this.uploadProductPicture(file, id, imagesCounter, validExtensions);

            imagesCounter++;
            images.push(productPicture);
        }

        return images;

    }

    async uploadProductPicture(file: any, id: string, imgNumber: number, validExtensions: string[]): Promise<FileEntity> {

        const name = 'image-' + imgNumber;
        const type = 'products';

        if (!isValidObjectId(id)) throw CustomError.badRequest(productNotFound.message, productNotFound.code);

        const product = await ProductModel.findById(id);

        if (!product) throw CustomError.badRequest(productNotFound.message, productNotFound.code);

        await this.checkIfImageExistsAndDelete(type, name, validExtensions, id);

        const productPicture = await this.uploadSingleFile(name, file, id, type, validExtensions);

        return FileEntity.fromObject(productPicture);

    }

    async uploadSingleFile(name: string, file: UploadedFile, id: string, type: string, validExtensions: string[] = ['jpg, jpeg, png']): Promise<FileEntity> {

        return new Promise((resolve, reject) => {

            this.uploadQueue.addToQueue(async () => {

                try {

                    const fileEntity = await this.performUpload(name, file, id, type, validExtensions);
                    resolve(fileEntity);

                } catch (error) {

                    reject(error);

                }
            });
        });


    }

    private async performUpload(name: string, file: UploadedFile, id: string, type: string, validExtensions: string[]): Promise<FileEntity> {
        try {
            // Verificar si la imagen esta en caché
            const cacheKey = `${type}/${id}/${name}`;
            const cachedFile = CacheAdapter.get<FileEntity>(cacheKey);

            if (cachedFile) return cachedFile;

            // Si no esta en cache la imagén, sigue con el proceso de subir la imagen

            const storageFB = getStorage();
            await this.firebaseSignIn(auth, envs.FIREBASE_AUTH_EMAIL, envs.FIREBASE_AUTH_KEY);

            const maxFileSize = validators.image.maxFileSize;

            FileValidator.validateFile(file, validExtensions, maxFileSize);

            const fileName = `${name}.webp`;
            const filePath = `${type}/${id}/${fileName}`;
            const storageRef = ref(storageFB, filePath);

            const fileBuffer = Buffer.from(file.data);
            const compressedBuffer = await ImageCompressor.compressToWebp(fileBuffer)

            const uploadTask = uploadBytesResumable(storageRef, compressedBuffer);

            await new Promise((resolve, reject) => {

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // TODO: Implementar el progreso en tiempo real usando websockets
                    },
                    (error) => reject(error),
                    () => resolve(null)
                );
            });

            const fileEntity = FileEntity.fromObject({
                name: fileName,
                path: filePath,
                imageUrl: `${envs.WEBSERVICE_URL}/images/${filePath}`,
                extension: 'webp',
                size: file.size,
            });

            CacheAdapter.set(cacheKey, fileEntity); // Se almacena la imagen en el caché por 1 hora.

            return fileEntity;

        } catch (error) {
            throw error;
        }
    }

    async uploadMultipleFiles(files: UploadedFile[], id: string, type: string, validExtensions: string[] = ['jpg, jpeg, png']): Promise<FileEntity[]> {

        const uploadPromises = files.map((file, index) => {
            const name = `image-${index + 1}`;
            return this.uploadSingleFile(name, file, id, type, validExtensions);
        });

        const fileEntities = await Promise.all(uploadPromises);

        return fileEntities;

    }




}


