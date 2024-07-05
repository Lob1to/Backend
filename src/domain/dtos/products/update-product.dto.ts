import { interfacesValidators, productsErrors, sharedErrors, validators } from "../../../config";

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
        public variants?: { [key: string]: any }[],
        public images?: string[],
        public categoryId?: string,
        public subcategoryId?: string,
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

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateProductDto?] {

        const {
            id,
            name,
            description,
            price,
            stock,
            variants,
            images,
            categoryId,
            subcategoryId,
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

        if (variants) {
            if (!Array.isArray(variants)) return [invalidVariants.message, invalidVariants.code];
            if (!interfacesValidators.isProductVariant(variants)) return [invalidVariants.message, invalidVariants.code];
        }

        if (images) {
            if (!Array.isArray(images)) return [invalidImages.message, invalidImages.code];
        }

        return [undefined, undefined, new UpdateProductDto(id, name, description, price, stock, variants, images, categoryId, subcategoryId)];

    }

}