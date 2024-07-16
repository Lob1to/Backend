

export abstract class GetImageDatasource {

    abstract getImageBuffer(type: string, img: string, id?: string): Promise<ArrayBuffer>;

}