import { JwtAdapter } from "../../../config/jwt.adapter";
import { EmailService } from "../../../presentation/services/email.service";
import { CustomError } from "../../errors/custom-error";

interface SendEmailValidationLinkUseCase {

    execute(email: string): Promise<boolean>;

}

export class SendEmailValidationLink implements SendEmailValidationLinkUseCase {

    constructor(
        private readonly webServiceUrl: string,
        private readonly emailService: EmailService,
    ) { }

    async execute(email: string): Promise<boolean> {

        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error while getting token', 'server-error');

        const link = `${this.webServiceUrl}/auth/validate-email/${token}`;
        const html = `
        <h1>Validate your email</h1>
        <p> Click on the following link to validate your email </p>
        <a href="${link}">Validate your email: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error while sending email', 'server-error');

        return true;

    }



}

