import { subcategoryErrors, validators } from "../../../config";


const { missingName, missingDescription, missingCategoryId, tooLongDescription } = subcategoryErrors;

export class CreateSubcategoryDto {

    constructor(

        public name: string,
        public description: string,
        public categoryId: string,

    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateSubcategoryDto?] {

        const { name, description, categoryId } = props;

        if (!name) return [missingName.message, missingName.code];
        if (!description) return [missingDescription.message, missingDescription.code];
        if (description.length > validators.description.maxLength) return [tooLongDescription.message, tooLongDescription.code];
        if (!categoryId) return [missingCategoryId.message, missingCategoryId.code];

        return [undefined, undefined, new CreateSubcategoryDto(name, description, categoryId)];

    }

}


