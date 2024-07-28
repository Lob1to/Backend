import { variantsErrors } from "../../../config";

const { missingPrice, missingStock, missingVariantType, invalidStock } = variantsErrors;

export class CreateVariantDto {

    private constructor(
        public price: number,
        public stock: number,
        public variantType: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateVariantDto?] {

        const { price, stock, variantType } = props;

        if (!price) return [missingPrice.message, missingPrice.code];
        if (!stock) return [missingStock.message, missingStock.code];
        if (stock < 0) return [invalidStock.message, invalidStock.code];
        if (!variantType) return [missingVariantType.message, missingVariantType.code];

        return [undefined, undefined, new CreateVariantDto(price, stock, variantType)];

    }

}

