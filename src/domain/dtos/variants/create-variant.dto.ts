import { variantsErrors } from "../../../config";

const { missingName, missingStock, missingVariantType, invalidStock } = variantsErrors;

export class CreateVariantDto {

    private constructor(
        public name: string,
        public stock: number,
        public variantType: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateVariantDto?] {

        const { name, stock, variantType } = props;

        if (!name) return [missingName.message, missingName.code];
        if (!stock) return [missingStock.message, missingStock.code];
        if (stock < 0) return [invalidStock.message, invalidStock.code];
        if (!variantType) return [missingVariantType.message, missingVariantType.code];

        return [undefined, undefined, new CreateVariantDto(name, stock, variantType)];

    }

}

