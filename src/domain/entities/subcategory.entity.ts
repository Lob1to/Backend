
export class SubcategoryEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public categoryId: string,

    ) { }


    static fromObject(object: { [key: string]: any }) {
        const { id, name, description, categoryId } = object;

        return new SubcategoryEntity(
            id,
            name,
            description,
            categoryId,
        );


    }

}


