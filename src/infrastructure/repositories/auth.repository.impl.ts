import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";

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

    deleteUser(token: string): Promise<UserEntity> {

        return this.datasource.deleteUser(token);
    }

    updateUser(updateUserDto: UpdateUserDto): Promise<string> {

        return this.datasource.updateUser(updateUserDto);
    }


}

