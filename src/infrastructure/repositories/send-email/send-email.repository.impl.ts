import { SendEmailDatasource, SendEmailRepository, SendMailOptions } from "../../../domain";


export class SendEmailRepositoryImpl implements SendEmailRepository {

    constructor(
        private readonly datasource: SendEmailDatasource,
    ) { }

    sendEmail(options: SendMailOptions): Promise<boolean> {

        return this.datasource.sendEmail(options);
    }



}

