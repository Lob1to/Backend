import { Readable } from "stream";


export abstract class GetImageDatasource {

    abstract getImageBuffer(type: string, img: string, id?: string): Promise<Buffer>;

}