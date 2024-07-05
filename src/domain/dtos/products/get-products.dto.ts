import { productsErrors } from "../../../config";

const {

    invalidPrice,
    invalidStock,

} = productsErrors;

export class GetProductsDto {

    private constructor(
        public name?: string,
        public price?: number,
        public maxPrice?: number,
        public minPrice?: number,
        public stock?: number,
        public categoryId?: string,
        public subcategoryId?: string,
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.name) returnObj.name = this.name;
        if (this.price) returnObj.price = this.price;
        if (this.maxPrice) returnObj.maxPrice = this.maxPrice;
        if (this.minPrice) returnObj.minPrice = this.minPrice;
        if (this.categoryId) returnObj.categoryId = this.categoryId;
        if (this.subcategoryId) returnObj.subcategoryId = this.subcategoryId;

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, GetProductsDto?] {

        const {
            name,
            price,
            maxPrice,
            minPrice,
            stock,
            categoryId,
            subcategoryId,
        } = props;

        if (price) {
            if (!isNaN(price) && price < 0) return [invalidPrice.message, invalidPrice.code];
        }

        if (maxPrice) {
            if (!isNaN(maxPrice) && maxPrice < 0) return [invalidPrice.message, invalidPrice.code];
        }

        if (minPrice) {
            if (!isNaN(minPrice) && minPrice < 0) return [invalidPrice.message, invalidPrice.code];
        }

        if (stock) {
            if (!isNaN(stock) && stock < 0) return [invalidStock.message, invalidStock.code];
        }


        return [undefined, undefined, new GetProductsDto(name, price, maxPrice, minPrice, stock, categoryId, subcategoryId)];

    }
}

