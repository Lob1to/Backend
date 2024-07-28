import sharp from "sharp";



export class ImageCompressor {

    static async compressToWebp(buffer: Buffer, quality: number = 80): Promise<Buffer> {

        return sharp(buffer).webp({ quality }).toBuffer();
    }

}