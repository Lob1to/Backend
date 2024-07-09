import { getStorage, ref, getDownloadURL, StorageError, getBytes } from "firebase/storage";
import { fileUploadErrors, sharedErrors } from "../../../config";
import { GetImageDatasource, CustomError } from "../../../domain";


const { unknownError } = sharedErrors;
const { imageNotFound } = fileUploadErrors;

export class GetImageDatasourceImpl implements GetImageDatasource {


    async getImageBuffer(type: string, img: string): Promise<ArrayBuffer> {

        try {

            const storageFB = getStorage();
            const imageRef = ref(storageFB, `${type}/${img}`);

            const imageBuffer = await getBytes(imageRef);

            return imageBuffer;

        } catch (error) {
            if (error instanceof StorageError) {
                switch (error.code) {
                    case 'storage/object-not-found':
                        throw CustomError.notFound(imageNotFound.message, imageNotFound.code);
                }

                throw error;
            }

            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }


    }



}


