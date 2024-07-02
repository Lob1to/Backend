import { categoryErrors, sharedErrors, validators } from "../../../config";
import { CustomError } from "../../errors/custom-error";

const { noFieldToUpdate } = sharedErrors;

export class UpdateCategoryDto {

    constructor(
        public id: string,
        public name?: string,
        public description?: string
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.id) returnObj.id = this.id;
        if (this.name) returnObj.name = this.name;
        if (this.description) returnObj.description = this.description;
        if (!returnObj.name && !returnObj.description) throw CustomError.badRequest(noFieldToUpdate.message, noFieldToUpdate.code);

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateCategoryDto?] {

        const { id, name, description } = props;
        const { tooLongDescription } = categoryErrors;
        const { missingId } = sharedErrors;

        if (!id) return [missingId.message, missingId.code];
        if (description && description.length > validators.description.maxLength) return [tooLongDescription.message, tooLongDescription.code];

        return [undefined, undefined, new UpdateCategoryDto(id, name, description)];

    }

}


