import { LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../";

export abstract class AuthRepository {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract deleteUser(token: string): Promise<UserEntity>;
    abstract updateUser(updateUserDto: UpdateUserDto): Promise<string>;
}