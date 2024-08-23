export interface CategoryImage {
    url: string;
}

export class CategoryEntity {

    constructor(

        public id: string,
        public name: string,
        public image: CategoryImage,
        public description: string,

    ) { }

    static fromObject(object: { [key: string]: any }): CategoryEntity {

        const { id, name, image, description } = object;

        return new CategoryEntity(id, name, image, description);

    }

}


