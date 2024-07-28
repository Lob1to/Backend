import { variantTypesErrors } from "../../../config";

const { invalidName, invalidType } = variantTypesErrors;

export class GetVariantTypesDto {

    private constructor(

        public name?: string,
        public type?: string,

    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {}

        if (this.name) returnObj.name = this.name;
        if (this.type) returnObj.type = this.type;

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, GetVariantTypesDto?] {

        const { name, type } = props;

        if (name && typeof name !== 'string') return [invalidName.message, invalidName.code];
        if (type && typeof type !== 'string') return [invalidType.message, invalidType.code];

        return [undefined, undefined, new GetVariantTypesDto(name, type)];

    }

}

