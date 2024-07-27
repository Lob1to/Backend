import { variantTypesErrors } from "../../../config";

const { missingName, missingType } = variantTypesErrors;

export class CreateVariantTypeDto {

    private constructor(
        public name: string,
        public type: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateVariantTypeDto?] {

        const { name, type } = props;

        if (!name) return [missingName.message, missingName.code];
        if (!type) return [missingType.message, missingType.code];

        return [undefined, undefined, new CreateVariantTypeDto(name, type)];

    }

}