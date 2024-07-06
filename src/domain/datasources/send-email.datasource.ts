
export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

export abstract class SendEmailDatasource {

    abstract sendEmail(options: SendMailOptions): Promise<boolean>;

}


