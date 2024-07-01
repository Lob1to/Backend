import { RegisterUserDto, UserEntity, LoginUserDto, UpdateUserDto } from "../";

/**
 * Defines the contract for an authentication data source, providing methods to login and register users.
 */

export abstract class AuthDatasource {

    /**
     * Logs in a user with the provided login credentials.
     * @param loginUserDto - The login credentials for the user.
     * @returns A promise that resolves to the logged-in user entity.
     */

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    /**
     * Registers a new user with the provided registration data.
     * @param registerUserDto - The registration data for the new user.
     * @returns A promise that resolves to the registered user entity.
     */

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

    abstract deleteUser(token: string): Promise<UserEntity>;

    abstract updateUser(updateUserDto: UpdateUserDto): Promise<string>;
}
