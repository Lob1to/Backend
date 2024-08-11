import { AuthDatasource, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity, CustomError } from "../../../domain";
import { UserModel } from "../../../data/mongo/";
import { authErrors, BcryptAdapter, JwtAdapter } from "../../../config";
import mongoose, { MongooseError } from "mongoose";

const {
    invalidCredentials,
    incorrectPassword,
    emailAlreadyInUse,
    invalidId,
    userNotFound,
    invalidToken,
    tokenGenerationError
} = authErrors;

export class AuthDatasourceImpl implements AuthDatasource {

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const user = await UserModel.findOne({ email: loginUserDto.email });

        if (!user) throw CustomError.unauthorized(invalidCredentials.message, invalidCredentials.code);

        try {

            const isPasswordMatch = BcryptAdapter.compare(loginUserDto.password, user.password);
            if (!isPasswordMatch) throw CustomError.unauthorized(incorrectPassword.message, incorrectPassword.code);

            const refreshToken = await JwtAdapter.generateToken({ id: user.id, role: user.role, tokenType: 'refresh-token' }, '1y') as string;
            if (!refreshToken) throw CustomError.internalServer(tokenGenerationError.message, tokenGenerationError.code);

            user.refreshToken = refreshToken;
            const updatedUser = await user.save();

            return UserEntity.fromObject(updatedUser);

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;

            throw error;
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest(emailAlreadyInUse.message, emailAlreadyInUse.code);

        try {
            const user = new UserModel(registerUserDto);
            user.password = BcryptAdapter.hash(user.password);
            const refreshToken = await JwtAdapter.generateToken({ id: user.id, role: user.role, tokenType: 'refresh-token' }, '1y') as string;
            if (!refreshToken) throw CustomError.internalServer(tokenGenerationError.message, tokenGenerationError.code);
            user.refreshToken = refreshToken;

            await user.save();

            return UserEntity.fromObject(user);

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }
    }

    async signOut(userId: string): Promise<void> {

        try {

            const user = await UserModel.findById(userId);
            if (!user) throw CustomError.badRequest(userNotFound.message, userNotFound.code);

            user.refreshToken = undefined;
            await user.save();

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {

        try {
            const { id } = updateUserDto;

            if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const user = await UserModel.findById(id);

            if (!user) throw CustomError.badRequest(userNotFound.message, userNotFound.code);

            const updatedUser = await UserModel.findByIdAndUpdate(id, updateUserDto.values, { new: true });
            if (!updatedUser) throw CustomError.badRequest(userNotFound.message, userNotFound.code);

            return UserEntity.fromObject(updatedUser);

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;

            throw error;

        }

    }

    async deleteUser(id: string): Promise<UserEntity> {

        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

        try {
            const user = await UserModel.findById(id);
            if (!user) throw CustomError.badRequest(userNotFound.message, userNotFound.code);

            await UserModel.findByIdAndDelete(id);

            return UserEntity.fromObject(user);


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }
    }

    async refreshToken(refreshToken: string): Promise<[UserEntity, string]> {

        const payload = await JwtAdapter.validateToken<{ id: string, role: string[], tokenType: string }>(refreshToken);
        if (!payload) throw CustomError.badRequest(invalidToken.message, invalidToken.code);

        if (payload.tokenType !== 'refresh-token') throw CustomError.badRequest(invalidToken.message, invalidToken.code);

        const user = await UserModel.findById(payload.id);
        if (!user) throw CustomError.unauthorized(userNotFound.message, userNotFound.code);

        const newAccessToken: string = await JwtAdapter.generateToken({ id: payload.id, role: payload.role, tokenType: 'access-token' }) as string;
        if (!newAccessToken) throw CustomError.internalServer(tokenGenerationError.message, tokenGenerationError.code);
        const userEntity = UserEntity.fromObject(user);

        return [userEntity, newAccessToken];
    }

}


