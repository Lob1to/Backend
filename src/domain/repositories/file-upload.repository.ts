import { FileEntity } from "../entities";


export abstract class FileUploadRepository {

    abstract uploadUserProfilePicture(
        file: any,
        id: string,
        validExtensions: string[]): Promise<FileEntity>

    abstract uploadProductPictures(
        files: any[],
        id: string,
        validExtensions: string[]): Promise<FileEntity[]>

    abstract uploadProductPicture(
        file: any,
        id: string,
        imgNumber: number,
        validExtensions: string[]): Promise<FileEntity>

    abstract uploadSingleFile(
        name: string,
        file: any,
        id: string,
        type: string,
        validExtensions: string[]): Promise<FileEntity>;

    abstract uploadMultipleFiles(
        files: any[],
        id: string,
        type: string,
        validExtensions: string[]): Promise<FileEntity[]>;

    abstract deleteFile(type: string,
        img: string,
        id: string): Promise<void>;

    abstract deleteProductImage(type: string,
        img: string,
        id: string): Promise<void>;

}


