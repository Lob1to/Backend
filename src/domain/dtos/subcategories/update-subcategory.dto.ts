import { CustomError } from "../..";
import { sharedErrors, subcategoryErrors, validators } from "../../../config";


const { tooLongDescription, missingId } = subcategoryErrors;
const { noFieldToUpdate } = sharedErrors;

export class UpdateSubcategoryDto {

    constructor(
        public id: string,
        public name?: string,
        public description?: string,
        public categoryId?: string,

    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.id) returnObj.id = this.id;
        if (this.name) returnObj.name = this.name;
        if (this.description) returnObj.description = this.description;
        if (this.categoryId) returnObj.categoryId = this.categoryId;
        if (!returnObj.name && !returnObj.description) throw CustomError.badRequest(noFieldToUpdate.message, noFieldToUpdate.code);

        return returnObj;


    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateSubcategoryDto?] {

        const { id, name, description, categoryId } = props;

        if (!id) return [missingId.message, missingId.code];
        if (description && description.length > validators.description.maxLength) return [tooLongDescription.message, tooLongDescription.code];

        return [undefined, undefined, new UpdateSubcategoryDto(id, name, description, categoryId)];

    }

}


