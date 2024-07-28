import { sharedErrors, variantsErrors } from "../../../config";

const { invalidStock, invalidPrice } = variantsErrors;
const { noFieldToUpdate } = sharedErrors;

export class UpdateVariantDto {

    private constructor(

        public id: string,
        public price?: number,
        public stock?: number,
        public variantType?: string,

    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.price) returnObj.price = this.price;
        if (this.stock) returnObj.stock = this.stock;
        if (this.variantType) returnObj.variantType = this.variantType;

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateVariantDto?] {

        const { id, price, stock, variantType } = props;

        if (price && price < 0) return [invalidPrice.message, invalidPrice.code];
        if (stock && stock < 0) return [invalidStock.message, invalidStock.code];
        if (!price && !stock && !variantType) return [noFieldToUpdate.message, noFieldToUpdate.code];

        return [undefined, undefined, new UpdateVariantDto(id, price, stock, variantType)];

    }

}