import { LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../";

export abstract class AuthRepository {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract signOut(userId: string): Promise<void>;
    abstract deleteUser(id: string): Promise<UserEntity>;
    abstract updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity>;
    abstract refreshToken(refreshToken: string): Promise<[UserEntity, string]>;
}