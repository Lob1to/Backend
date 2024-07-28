


export class VariantTypeEntity {

    constructor(

        public id: string,
        public name: string,
        public type: string,

    ) { }

    static fromObject(obj: { [key: string]: any }): VariantTypeEntity {
        const { id, name, type } = obj;

        return new VariantTypeEntity(id, name, type);
    }

}