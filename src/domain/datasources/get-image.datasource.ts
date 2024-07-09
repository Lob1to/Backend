

export abstract class GetImageDatasource {

    abstract getImageBuffer(type: string, img: string): Promise<ArrayBuffer>;

}