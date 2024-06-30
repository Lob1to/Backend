import { AuthRepository, LoginUserDto } from "../..";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { CustomError } from "../../errors/custom-error";

interface LoginUserUseCase {

    execute(loginUserDto: LoginUserDto): Promise<{ [key: string]: any }>

}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private authRepository: AuthRepository,
    ) { }


    async execute(loginUserDto: LoginUserDto): Promise<{ [key: string]: any }> {

        const newUser = await this.authRepository.login(loginUserDto);

        const token = await JwtAdapter.generateToken({ id: newUser.id });

        if (!token) throw CustomError.internalServer('Error while getting token', 'server-error');

        const { password, ...userEntity } = newUser;

        return {
            user: userEntity,
            token: token,
        };

    }


}


