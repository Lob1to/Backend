import { validators } from "../../../config";
import { CustomError } from "../../errors/custom-error";


export class UpdateUserDto {

    private constructor(
        public id: string,
        public name?: string,
        public email?: string,
        public img?: string,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.name) returnObj.name = this.name;
        if (this.email) returnObj.email = this.email;
        if (this.img) returnObj.img = this.img;

        if (!returnObj.name && !returnObj.email && !returnObj.img) {
            throw CustomError.badRequest('Cannot update user without any field', 'no-field-to-update');
        }

        return returnObj
    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateUserDto?] {

        const { id, name, email, img } = props;

        if (!id) return ['Id parameter is required', 'missing-id'];

        if (email) {
            if (!validators.email.test(email)) return ['Invalid email', 'invalid-email'];
        }
        if (img) {
            if (typeof img !== 'string') return ['Invalid image', 'invalid-img'];
        }

        return [undefined, undefined, new UpdateUserDto(id, name, email, img)];

    }

}


