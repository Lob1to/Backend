

export abstract class GetImageRepository {

    abstract getImageBuffer(type: string, img: string): Promise<ArrayBuffer>;

}