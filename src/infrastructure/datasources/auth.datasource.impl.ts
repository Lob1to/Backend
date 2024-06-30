import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongo/models/user.model";
import { AuthDatasource, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { CustomError } from "../../domain/errors/custom-error";


export class AuthDatasourceImpl implements AuthDatasource {

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.unauthorized('Invalid email', 'invalid-email');

        try {

            const isPasswordMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
            if (!isPasswordMatch) throw CustomError.unauthorized('Invalid password', 'invalid-password');

            return UserEntity.fromObject(user);

        } catch (error) {
            throw CustomError.internalServer('Internal server error', 'unknown-error');
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('User already exist', 'user-already-exist');

        try {
            const user = new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(user.password);

            await user.save();

            return UserEntity.fromObject(user);

        } catch (error) {
            console.log(error);

            throw error;
        }
    }

}


