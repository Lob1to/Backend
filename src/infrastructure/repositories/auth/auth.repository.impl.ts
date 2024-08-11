import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../../domain";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource,
    ) { }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        return this.datasource.login(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {


        return this.datasource.register(registerUserDto);
    }

    signOut(userId: string): Promise<void> {

        return this.datasource.signOut(userId);
    }

    deleteUser(id: string): Promise<UserEntity> {

        return this.datasource.deleteUser(id);
    }

    updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {

        return this.datasource.updateUser(updateUserDto);
    }

    refreshToken(refreshToken: string): Promise<[UserEntity, string]> {

        return this.datasource.refreshToken(refreshToken);
    }

}

