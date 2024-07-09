

export class FileEntity {

    constructor(

        public name: string,
        public path: string,
        public imageUrl: string,
        public extension: string,
        public size: number,

    ) { }

    static fromObject(object: { [key: string]: any }) {

        const {
            name,
            path,
            imageUrl,
            extension,
            size
        } = object;

        return new FileEntity(name, path, imageUrl, extension, size);

    }


}

