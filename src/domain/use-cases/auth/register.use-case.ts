import { AuthRepository, RegisterUserDto, UserEntity } from "../..";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { CustomError } from "../../errors/custom-error";
import { SendEmailValidationLink } from "./send-email-validation-link.use-case";

interface RegisterUserUseCase {

    execute(registerUserDto: RegisterUserDto): Promise<{ [key: string]: any }>

}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private authRepository: AuthRepository,
        private sendEmail: SendEmailValidationLink,
    ) { }


    async execute(registerUserDto: RegisterUserDto): Promise<{ [key: string]: any }> {
        const newUser = await this.authRepository.register(registerUserDto);
        await this.sendEmail.execute(newUser.email);

        const token = await JwtAdapter.generateToken({ id: newUser.id });
        if (!token) throw CustomError.internalServer('Internal server error on token generation');

        const { password, ...userEntity } = newUser;

        return {
            user: userEntity,
            token: token,
        };

    }


}


