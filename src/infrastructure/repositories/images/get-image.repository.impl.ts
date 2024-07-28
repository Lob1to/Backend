import { GetImageDatasource, GetImageRepository } from "../../../domain";


export class GetImageRepositoryImpl implements GetImageRepository {
    constructor(
        private readonly datasource: GetImageDatasource,
    ) { }

    getImageBuffer(type: string, img: string, id?: string): Promise<Buffer> {
        return this.datasource.getImageBuffer(type, img, id);
    }



}

