import { AuthDatasource, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity, CustomError } from "../../domain";
import { UserModel } from "../../data/mongo/models/user.model";
import mongoose, { MongooseError } from "mongoose";
import { bcryptAdapter, authErrors } from "../../config";

const {
    invalidCredentials,
    invalidPassword,
    emailAlreadyInUse,
    invalidId,
    userNotFound,
} = authErrors;

export class AuthDatasourceImpl implements AuthDatasource {

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const user = await UserModel.findOne({ email: loginUserDto.email });

        if (!user) throw CustomError.unauthorized(invalidCredentials.message, invalidCredentials.code);

        try {

            const isPasswordMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
            if (!isPasswordMatch) throw CustomError.unauthorized(invalidPassword.message, invalidPassword.code);

            return UserEntity.fromObject(user);

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest(emailAlreadyInUse.message, emailAlreadyInUse.code);

        try {
            const user = new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(user.password);

            await user.save();

            return UserEntity.fromObject(user);

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;
        }
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<string> {

        try {
            const { id } = updateUserDto;

            if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const user = await UserModel.findById(id);

            if (!user) throw CustomError.badRequest(userNotFound.message, userNotFound.code);

            await UserModel.findByIdAndUpdate(id, updateUserDto.values, { new: true });

            return 'El usuario ha sido actualizado correctamente';

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;

        }

    }

    async deleteUser(id: string): Promise<string> {

        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

        try {
            const user = await UserModel.findById(id);
            if (!user) throw CustomError.badRequest(userNotFound.message, userNotFound.code);

            await UserModel.findByIdAndDelete(id);

            return 'El usuario ha sido eliminado correctamente';


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;
        }
    }

}


