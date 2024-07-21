import { productsErrors, sharedErrors, validators } from "../../../config";
import { ProductImage } from "../../entities";

const {
    tooLongDescription,
    invalidPrice,
    invalidStock,
    invalidImages,
    invalidVariants,
} = productsErrors;

const { missingId } = sharedErrors;

export class UpdateProductDto {

    constructor(
        public id: string,
        public name?: string,
        public description?: string,
        public price?: number,
        public stock?: number,
        public images?: ProductImage[],
        public categoryId?: string,
        public subcategoryId?: string,
        public variantId?: string[],
        public variantTypeId?: string,
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.id) returnObj.id = this.id;
        if (this.name) returnObj.name = this.name;
        if (this.description) returnObj.description = this.description;
        if (this.price) returnObj.price = this.price;
        if (this.stock) returnObj.stock = this.stock;
        if (this.images) returnObj.images = this.images;
        if (this.categoryId) returnObj.categoryId = this.categoryId;
        if (this.subcategoryId) returnObj.subcategoryId = this.subcategoryId;
        if (this.variantId) returnObj.variantId = this.variantId;
        if (this.variantTypeId) returnObj.variantTypeId = this.variantTypeId;

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateProductDto?] {

        const {
            id,
            name,
            description,
            price,
            stock,
            images,
            categoryId,
            subcategoryId,
            variantId,
            variantTypeId,
        } = props;

        if (!id) return [missingId.message, missingId.code];
        if (description) {
            if (description.length > validators.description.maxLength) return [tooLongDescription.message, tooLongDescription.code];
        }
        if (price) {
            if (isNaN(price) || price < 0) return [invalidPrice.message, invalidPrice.code];
        }

        if (stock) {
            if (isNaN(stock) || stock < 0) return [invalidStock.message, invalidStock.code];
        }

        if (variantId) {
            if (!Array.isArray(variantId)) return [invalidVariants.message, invalidVariants.code];
            if (variantId.length > 0 && !variantId.every(variant => typeof variant === 'string')) return [invalidVariants.message, invalidVariants.code];
        }

        if (variantTypeId) {
            if (typeof variantTypeId !== 'string') return [invalidVariants.message, invalidVariants.code];
        }

        if (images) {
            if (!Array.isArray(images)) return [invalidImages.message, invalidImages.code];
            if (images.length > 0 && !images.every(image => image.url || image.image)) return [invalidImages.message, invalidImages.code];
        }

        return [undefined, undefined, new UpdateProductDto(id, name, description, price, stock, images, categoryId, subcategoryId, variantId, variantTypeId)];

    }

}