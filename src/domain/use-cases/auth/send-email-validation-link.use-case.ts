import { LogSeverityLevel, CustomError, LogRepository, CreateLog } from "../../";
import { EmailService } from "../../../presentation/services/email.service";
import { JwtAdapter, authErrors, htmlBodies } from "../../../config/";

interface SendEmailValidationLinkUseCase {

    execute(email: string): Promise<boolean>;

}

export class SendEmailValidationLink implements SendEmailValidationLinkUseCase {

    constructor(
        private readonly webServiceUrl: string,
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(email: string): Promise<boolean> {

        const { tokenGenerationError, sendEmailError } = authErrors;

        try {
            const token = await JwtAdapter.generateToken({ email });
            if (!token) throw CustomError.internalServer(tokenGenerationError.message, tokenGenerationError.code);

            const link = `${this.webServiceUrl}/auth/validate-email/${token}`;
            //TODO: Resend email link
            const resendEmailLink = `${this.webServiceUrl}/auth/validate-email/resend-email/`;

            const privacyPolicyLink = `${this.webServiceUrl}/privacy-policy`;

            const unsubscribeLink = `${this.webServiceUrl}/unsubscribeLink`;

            const html = htmlBodies.validateEmail({
                link: link,
                username: 'User',
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

            const isSent = await this.emailService.sendEmail(options);
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

