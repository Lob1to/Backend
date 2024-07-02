
export class CategoryEntity {

    constructor(

        public id: string,
        public name: string,
        public description: string,

    ) { }

    static fromObject(object: { [key: string]: any }): CategoryEntity {

        const { id, name, description } = object;

        return new CategoryEntity(id, name, description);

    }

}


