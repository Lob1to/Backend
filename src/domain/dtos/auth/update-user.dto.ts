import { validators, authErrors } from "../../../config";
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
            const { noFieldToUpdate } = authErrors;

            throw CustomError.badRequest(noFieldToUpdate.message, noFieldToUpdate.code);
        }

        return returnObj
    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateUserDto?] {

        const { id, name, email, img } = props;
        const { missingId, invalidEmail, invalidImg } = authErrors;

        if (!id) return [missingId.message, missingId.code];

        if (email) {
            if (!validators.email.test(email)) return [invalidEmail.message, invalidEmail.code];
        }
        if (img) {
            if (typeof img !== 'string') return [invalidImg.message, invalidImg.code];
        }

        return [undefined, undefined, new UpdateUserDto(id, name, email, img)];

    }

}


