
export interface IVariant {
    price: number,
    stock: number,
    size: string,
    color: string,
}

export class ProductEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public stock: number,
        public variants: IVariant[],
        public images: string[],
        public categoryId: string,
        public subcategoryId: string,
    ) { }


    static fromObject(object: { [key: string]: any }): ProductEntity {

        const { id, name, description, price, stock, variants, images, categoryId, subcategoryId } = object;

        return new ProductEntity(
            id,
            name,
            description,
            price,
            stock,
            variants,
            images,
            categoryId,
            subcategoryId,
        );


    }


}



