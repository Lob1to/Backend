import { validators } from "../../../config";


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
        if (!email) return ['Missing email', 'missing-email'];
        if (!validators.email.test(email)) return ['Invalid email', 'invalid-email'];
        if (!password) return ['Missing password', 'missing-password'];
        if (password.length < validators.password.minLength) return ['Password too short', 'short-password'];
        if (password.length >= validators.password.maxLength) return ['Password too long', 'long-password'];

        return [undefined, undefined, new LoginUserDto(email, password)];

    }
}
