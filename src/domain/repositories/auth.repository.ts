import { LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../";

export abstract class AuthRepository {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract deleteUser(id: string): Promise<UserEntity>;
    abstract updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity>;
    abstract refreshToken(refreshToken: string): Promise<string>;
}