import sharp from "sharp";


export class ImageCompressor {

    /**
     * Compresses a buffer of image data to WebP format with the specified quality.
     *
     * @param buffer - The input image data as a Buffer.
     * @param quality - The desired quality of the compressed WebP image, between 0 (worst) and 100 (best). Defaults to 80.
     * @returns A Promise that resolves to the compressed WebP image data as a Buffer.
     */
    static async compressToWebp(buffer: Buffer, quality: number = 80): Promise<Buffer> {

        return sharp(buffer).webp({ quality }).toBuffer();
    }

}