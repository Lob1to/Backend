import nodemailer, { Transporter } from "nodemailer";
import { SendEmailDatasource, SendMailOptions } from "../../../domain";

export class SendEmailDatasourceImpl implements SendEmailDatasource {

    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
    ) {

        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword,
            }
        });
    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {

            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });

            return true;
        } catch (error) {
            throw error;
        }


    }



}


