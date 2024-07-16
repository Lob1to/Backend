

export abstract class GetImageRepository {

    abstract getImageBuffer(type: string, img: string, id?: string): Promise<ArrayBuffer>;

}