import { LogSeverityLevel, CustomError, LogRepository, CreateLog, SendEmailRepository } from "../../";
import { JwtAdapter, authErrors, htmlBodies } from "../../../config/";
import { SendEmail } from "../send-email/send-email.use-case";

interface SendEmailValidationLinkUseCase {

    execute(email: string, user: string): Promise<boolean>;

}

export class SendEmailValidationLink implements SendEmailValidationLinkUseCase {

    constructor(
        private readonly webServiceUrl: string,
        private readonly sendEmailUseCase: SendEmail,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(email: string, user: string): Promise<boolean> {

        const { tokenGenerationError, sendEmailError } = authErrors;

        try {
            const token = await JwtAdapter.generateToken({ email });
            if (!token) throw CustomError.internalServer(tokenGenerationError.message, tokenGenerationError.code);

            const link = `${this.webServiceUrl}/auth/validate-email/${token}`;

            const resendEmailLink = `${this.webServiceUrl}/auth/validate-email/resend-email/`;

            const privacyPolicyLink = `${this.webServiceUrl}/privacy-policy`;

            const unsubscribeLink = `${this.webServiceUrl}/unsubscribeLink`;

            const html = htmlBodies.validateEmail({
                link: link,
                username: user,
                companyName: 'Nana Anchetas',
                resendEmailLink: resendEmailLink,
                privacyPolicyLink: privacyPolicyLink,
                unsubscribeLink: unsubscribeLink,

            });

            const options = {
                to: email,
                subject: 'Validate your email',
                htmlBody: html,
            }

            const isSent = await this.sendEmailUseCase.execute(options);

            if (!isSent) throw CustomError.internalServer(sendEmailError.message, sendEmailError.code);

            return true;

        } catch (error) {

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-validation-link.use-case',
            });

            return false;

        }

    }



}

