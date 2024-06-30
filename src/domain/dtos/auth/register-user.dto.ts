import { validators } from "../../../config";


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

        if (!name) return ['Missing name', 'missing-name'];
        if (!email) return ['Missing email', 'missing-email'];
        if (!validators.email.test(email)) return ['Invalid email', 'invalid-email'];
        if (!password) return ['Missing password', 'missing-password'];
        if (password.length < validators.password.minLength) return ['Password too short', 'password-too-short'];
        if (password.length > validators.password.maxLength) return ['Password too long', 'password-too-long'];
        if (!validators.password.RegExp.test(password)) return ['Invalid password', 'invalid-password'];

        return [undefined, undefined, new RegisterUserDto(name, email, password)];
    }
}


