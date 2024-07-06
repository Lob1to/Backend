import { SendMailOptions } from "../datasources";


export abstract class SendEmailRepository {

    abstract sendEmail(options: SendMailOptions): Promise<boolean>;

}


