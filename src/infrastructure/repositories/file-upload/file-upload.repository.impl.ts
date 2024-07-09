import { FileEntity, FileUploadDatasource, FileUploadRepository } from "../../../domain";



export class FileUploadRepositoryImpl implements FileUploadRepository {

    constructor(
        private readonly datasource: FileUploadDatasource,
    ) { }

    uploadSingleFile(file: any, userId: string, type: string, validExtensions: string[]): Promise<FileEntity> {

        return this.datasource.uploadSingleFile(file, userId, type, validExtensions);
    }
    uploadMultipleFiles(files: any[], userId: string, type: string, validExtensions: string[]): Promise<FileEntity[]> {

        return this.datasource.uploadMultipleFiles(files, userId, type, validExtensions);
    }


}