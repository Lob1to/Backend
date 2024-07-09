import { FileEntity } from "../entities";


export abstract class FileUploadRepository {

    abstract uploadSingleFile(
        file: any,
        userId: string,
        type: string,
        validExtensions: string[]): Promise<FileEntity>;

    abstract uploadMultipleFiles(
        files: any[],
        userId: string,
        type: string,
        validExtensions: string[]): Promise<FileEntity[]>;

}


