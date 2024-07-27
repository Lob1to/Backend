import { sharedErrors, variantTypesErrors } from "../../../config";

const { invalidName, invalidType } = variantTypesErrors;
const { noFieldToUpdate } = sharedErrors;

export class UpdateVariantTypeDto {

    private constructor(
        public id: string,
        public name: string,
        public type: string,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {}

        if (this.name) returnObj.name = this.name;
        if (this.type) returnObj.type = this.type;
        if (Object.keys(returnObj).length === 0) return [noFieldToUpdate.message, noFieldToUpdate.code];

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateVariantTypeDto?] {

        const { id, name, type } = props;

        if (name && typeof name !== 'string') return [invalidName.message, invalidName.code];
        if (type && typeof type !== 'string') return [invalidType.message, invalidType.code];

        return [undefined, undefined, new UpdateVariantTypeDto(id, name, type)];

    }

}

