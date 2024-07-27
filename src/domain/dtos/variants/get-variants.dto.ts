import { variantsErrors, sharedErrors } from "../../../config";

const { invalidStock } = variantsErrors;
const { noFieldToUpdate } = sharedErrors;

export class GetVariantsDto {

    private constructor(
        public name?: string,
        public stock?: number,
        public variantType?: string,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.name) returnObj.name = this.name;
        if (this.stock) returnObj.stock = this.stock;
        if (this.variantType) returnObj.variantType = this.variantType;
        if (Object.keys(returnObj).length === 0) return [noFieldToUpdate.message, noFieldToUpdate.code];

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, GetVariantsDto?] {

        const { name, stock, variantType } = props;

        if (stock && stock < 0) return [invalidStock.message, invalidStock.code];

        return [undefined, undefined, new GetVariantsDto(name, stock, variantType)];

    }

}

