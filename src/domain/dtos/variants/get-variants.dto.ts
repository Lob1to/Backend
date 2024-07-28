import { variantsErrors } from "../../../config";

const { invalidStock, invalidPrice } = variantsErrors;

export class GetVariantsDto {

    private constructor(
        public price?: number,
        public stock?: number,
        public variantType?: string,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.price) returnObj.name = this.price;
        if (this.stock) returnObj.stock = this.stock;
        if (this.variantType) returnObj.variantType = this.variantType;

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, GetVariantsDto?] {

        const { price, stock, variantType } = props;

        if (price && price < 0) return [invalidPrice.message, invalidPrice.code];
        if (stock && stock < 0) return [invalidStock.message, invalidStock.code];

        return [undefined, undefined, new GetVariantsDto(price, stock, variantType)];

    }

}

