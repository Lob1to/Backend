import { authErrors } from "../../config";
import { CustomError } from "../errors/custom-error";


/**
 * Represents a user entity with various properties such as id, name, email, email validation status, password, role, and optional image.
 * 
 * The `fromObject` static method can be used to create a `UserEntity` instance from a plain JavaScript object.
 * 
 * @param id - The unique identifier of the user.
 * @param name - The name of the user.
 * @param email - The email address of the user.
 * @param emailValidated - A boolean indicating whether the user's email has been validated.
 * @param password - The user's password.
 * @param role - An array of strings representing the user's roles.
 * @param img - An optional array of strings representing the user's images.
 */

export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string[],
        public refreshToken?: string
    ) { }

    static fromObject(object: { [key: string]: any }): UserEntity {

        const { id, _id, name, email, emailValidated, password, role, img, refreshToken } = object;
        const { missingId, missingName, missingEmail, missingEmailValidated, missingPassword, missingRole } = authErrors;

        if (!id || !_id) {
            throw CustomError.badRequest(missingId.message, missingId.code);
        }
        if (!name) throw CustomError.badRequest(missingName.message, missingName.code);

        if (!email) throw CustomError.badRequest(missingEmail.message, missingEmail.code);

        if (emailValidated === undefined) throw CustomError.badRequest(missingEmailValidated.message, missingEmailValidated.code);

        if (!password) throw CustomError.badRequest(missingPassword.message, missingPassword.code);

        if (!role) throw CustomError.badRequest(missingRole.message, missingRole.code);

        return new UserEntity(id, name, email, emailValidated, password, role, img, refreshToken);


    }

}

