import { productsErrors, validators } from "../../../config";
import { ProductImage } from "../../entities";

const {
    missingName,
    missingDescription,
    tooLongDescription,
    missingPrice,
    invalidPrice,
    missingStock,
    invalidStock,
    invalidVariants,
    invalidImages,
    missingCategoryId,
    missingSubcategoryId
} = productsErrors;

export class CreateProductDto {
    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public stock: number,
        public images: ProductImage[],
        public categoryId: string,
        public subcategoryId: string,
        public variantId?: string[],
        public variantTypeId?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateProductDto?] {

        const {
            name,
            description,
            price,
            stock,
            images,
            categoryId,
            subcategoryId,
            variantId,
            variantTypeId
        } = props;

        if (!name) return [missingName.message, missingName.code];
        if (!description) return [missingDescription.message, missingDescription.code];
        if (description.length > validators.description.maxLength) return [tooLongDescription.message, tooLongDescription.code];
        if (!price) return [missingPrice.message, missingPrice.code];
        if (isNaN(price) || price < 0) return [invalidPrice.message, invalidPrice.code];
        if (!stock) return [missingStock.message, missingStock.code];
        if (isNaN(stock) || stock < 0) return [invalidStock.message, invalidStock.code];


        if (images && !Array.isArray(images)) return [invalidImages.message, invalidImages.code];
        if (images && !images.every((image: { [key: string]: any }) => image.url || image.image || image.path)) return [invalidImages.message, invalidImages.code];
        if (!categoryId) return [missingCategoryId.message, missingCategoryId.code];
        if (!subcategoryId) return [missingSubcategoryId.message, missingSubcategoryId.code];

        if (variantId && !Array.isArray(variantId)) return [invalidVariants.message, invalidVariants.code];
        if (variantId && variantId.length !== 0) return [invalidVariants.message, invalidVariants.code];
        if (variantTypeId && typeof variantTypeId === 'string') return [invalidVariants.message, invalidVariants.code];

        return [undefined, undefined, new CreateProductDto(name, description, price, stock, images, categoryId, subcategoryId, variantId, variantTypeId)];

    }


}