import { interfacesValidators, productsErrors, validators } from "../../../config";
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
    missingImages,
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
        public variants?: { [key: string]: any }[],
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
            variants,
        } = props;

        if (!name) return [missingName.message, missingName.code];
        if (!description) return [missingDescription.message, missingDescription.code];
        if (description.length > validators.description.maxLength) return [tooLongDescription.message, tooLongDescription.code];
        if (!price) return [missingPrice.message, missingPrice.code];
        if (isNaN(price) || price < 0) return [invalidPrice.message, invalidPrice.code];
        if (!stock) return [missingStock.message, missingStock.code];
        if (isNaN(stock) || stock < 0) return [invalidStock.message, invalidStock.code];

        if (variants && !Array.isArray(variants)) return [invalidVariants.message, invalidVariants.code];
        if (variants && variants.length !== 0 && !interfacesValidators.isProductVariant(variants)) return [invalidVariants.message, invalidVariants.code];

        if (!images) return [missingImages.message, missingImages.code];
        if (!Array.isArray(images)) return [invalidImages.message, invalidImages.code];
        if (!images.every(image => image.url || image.image)) return [invalidImages.message, invalidImages.code];
        if (!categoryId) return [missingCategoryId.message, missingCategoryId.code];
        if (!subcategoryId) return [missingSubcategoryId.message, missingSubcategoryId.code];

        return [undefined, undefined, new CreateProductDto(name, description, price, stock, images, categoryId, subcategoryId, variants ?? [])];

    }


}