import { categoryErrors, validators } from "../../../config";


export class CreateCategoryDto {

    constructor(
        public name: string,
        public image?: string,
        public description?: string,

    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateCategoryDto?] {

        const { name, image, description } = props;
        const { missingName, tooLongDescription } = categoryErrors;

        if (!name) return [missingName.message, missingName.code];
        if (description && description.length > validators.description.maxLength) return [tooLongDescription.message, tooLongDescription.code];

        return [undefined, undefined, new CreateCategoryDto(name, image, description)];

    }

}

