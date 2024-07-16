import { FileEntity, FileUploadDatasource, FileUploadRepository } from "../../../domain";



export class FileUploadRepositoryImpl implements FileUploadRepository {

    constructor(
        private readonly datasource: FileUploadDatasource,
    ) { }

    deleteFile(type: string, img: string, id: string): Promise<void> {

        return this.datasource.deleteFile(type, img, id);
    }

    uploadUserProfilePicture(file: any, id: string, validExtensions: string[]): Promise<FileEntity> {

        return this.datasource.uploadUserProfilePicture(file, id, validExtensions);
    }
    uploadProductPictures(files: any[], id: string, validExtensions: string[]): Promise<FileEntity[]> {

        return this.datasource.uploadProductPictures(files, id, validExtensions);
    }

    uploadSingleFile(name: string, file: any, userId: string, type: string, validExtensions: string[]): Promise<FileEntity> {

        return this.datasource.uploadSingleFile(name, file, userId, type, validExtensions);
    }
    uploadMultipleFiles(files: any[], userId: string, type: string, validExtensions: string[]): Promise<FileEntity[]> {

        return this.datasource.uploadMultipleFiles(files, userId, type, validExtensions);
    }


}