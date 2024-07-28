import { getStorage, ref, StorageError, getBytes } from "firebase/storage";
import { CacheAdapter, fileUploadErrors, sharedErrors } from "../../../config";
import { GetImageDatasource, CustomError } from "../../../domain";


const { imageNotFound } = fileUploadErrors;

export class GetImageDatasourceImpl implements GetImageDatasource {


    async getImageBuffer(type: string, img: string, id?: string): Promise<Buffer> {

        const cacheKey = `image_${type}_${id}_${img}`;
        const cachedImage = CacheAdapter.get<Buffer>(cacheKey);

        if (cachedImage) return cachedImage;

        let newId = '';
        if (id) { newId = `${id}/` };

        try {

            const storageFB = getStorage();
            const imageRef = ref(storageFB, `${type}/${newId}${img}`);

            const arrBuffer = await getBytes(imageRef);
            const imageBuffer = Buffer.from(arrBuffer);

            // Almacenamiento de la imagen en cache por 1 hora.

            CacheAdapter.set(cacheKey, imageBuffer);

            return imageBuffer;

        } catch (error) {
            if (error instanceof StorageError) {
                switch (error.code) {
                    case 'storage/object-not-found':
                        throw CustomError.notFound(imageNotFound.message, imageNotFound.code);
                }

                throw error;
            }

            throw error;

        }


    }



}


