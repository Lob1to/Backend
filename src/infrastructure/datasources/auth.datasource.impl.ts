import { MongooseError } from "mongoose";
import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongo/models/user.model";
import { AuthDatasource, CreateLog, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";
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

    async updateUser(updateUserDto: UpdateUserDto): Promise<string> {

        try {

            const user = await UserModel.findById(updateUserDto.id);
            if (!user) throw CustomError.badRequest('User not found', 'user-not-found');

            await UserModel.findByIdAndUpdate(user.id, updateUserDto.values, { new: true });

            return 'User updated successfully';

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;

        }

    }

    deleteUser(token: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

}


