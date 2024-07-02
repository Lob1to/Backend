import { validators, authErrors } from "../../../config";


/**
 * Data transfer object (DTO) for registering a new user.
 * 
 * @param name - The name of the user.
 * @param email - The email address of the user.
 * @param password - The password for the user's account.
 */

export class RegisterUserDto {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) { }

    /**
     * Creates a new `RegisterUserDto` instance from the provided properties.
     * 
     * @param props - An object containing the properties to initialize the DTO with.
     * @returns An array with the following elements:
     * 1. `undefined` if all properties are valid, or an error message string if any property is invalid.
     * 2. `undefined` if all properties are valid, or an error code string if any property is invalid.
     * 3. `undefined` if any property is invalid, or a new `RegisterUserDto` instance if all properties are valid.
     */
    static create(props: { [key: string]: any }): [string?, string?, RegisterUserDto?] {
        // Implementation details omitted

        const { name, email, password } = props;
        const { missingName, missingEmail, invalidEmail, missingPassword, shortPassword, longPassword, invalidPassword } = authErrors;

        if (!name) return [missingName.message, missingName.code];

        if (!email) return [missingEmail.message, missingEmail.code];

        if (!validators.email.test(email)) return [invalidEmail.message, invalidEmail.code];

        if (!password) return [missingPassword.message, missingPassword.code];

        if (password.length < validators.password.minLength) return [shortPassword.message, shortPassword.code];

        if (password.length > validators.password.maxLength) return [longPassword.message, longPassword.code];

        if (!validators.password.RegExp.test(password)) return [invalidPassword.message, invalidPassword.code];

        return [undefined, undefined, new RegisterUserDto(name, email, password)];
    }
}


