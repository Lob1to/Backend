import { validators } from "../../../config";


export class LoginUserDto {

    private constructor(
        readonly email: string,
        readonly password: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = props;
        if (!email) return ['Missing email'];
        if (!validators.email.test(email)) return ['Invalid email'];
        if (!password) return ['Missing password'];

        return [undefined, new LoginUserDto(email, password)];

    }
}
