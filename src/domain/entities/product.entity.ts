export interface ProductImage {
    image: number;
    url: string;
    path: string;
}

export class ProductEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public stock: number,
        public variantTypeId: string[],
        public variantId: String,
        public images: ProductImage[],
        public categoryId: string,
        public subcategoryId: string,
    ) { }


    static fromObject(object: { [key: string]: any }): ProductEntity {

        const { id, name, description, price, stock, variantTypeId, variantId, images, categoryId, subcategoryId } = object;

        return new ProductEntity(
            id,
            name,
            description,
            price,
            stock,
            variantTypeId,
            variantId,
            images,
            categoryId,
            subcategoryId,
        );


    }


}



