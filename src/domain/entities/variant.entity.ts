
export class VariantEntity {

    constructor(
        public id: string,
        public name: string,
        public stock: number,
        public variantType: string,
    ) { }

    static fromObject(obj: { [key: string]: any }): VariantEntity {

        const { id, name, stock, variantType } = obj;

        return new VariantEntity(id, name, stock, variantType);

    }

}


