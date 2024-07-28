
export class VariantEntity {

    constructor(
        public id: string,
        public price: number,
        public stock: number,
        public variantType: string,
    ) { }

    static fromObject(obj: { [key: string]: any }): VariantEntity {

        const { id, price, stock, variantType } = obj;

        return new VariantEntity(id, price, stock, variantType);

    }

}


