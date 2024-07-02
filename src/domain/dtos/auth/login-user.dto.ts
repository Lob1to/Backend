import { validators, authErrors } from "../../../config";


/**
 * A data transfer object (DTO) representing the login credentials for a user.
 * This DTO is used to validate and create a new `LoginUserDto` instance.
 *
 * @param email - The email address of the user.
 * @param password - The password of the user.
 * @returns A tuple containing error message and error type and a `LoginUserDto` instance.
 */

export class LoginUserDto {

    private constructor(
        readonly email: string,
        readonly password: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, string?, LoginUserDto?] {

        const { email, password } = props;
        const { missingEmail, invalidEmail, missingPassword, shortPassword, longPassword } = authErrors;

        if (!email) return [missingEmail.message, missingEmail.code];

        if (!validators.email.test(email)) return [invalidEmail.message, invalidEmail.code];

        if (!password) return [missingPassword.message, missingPassword.code];

        if (password.length < validators.password.minLength) return [shortPassword.message, shortPassword.code];

        if (password.length >= validators.password.maxLength) return [longPassword.message, longPassword.code];

        return [undefined, undefined, new LoginUserDto(email, password)];

    }
}
