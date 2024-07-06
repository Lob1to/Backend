import { SendMailOptions } from "../../datasources";
import { SendEmailRepository } from "../../repositories";

interface SendEmailUseCase {

    execute(options: SendMailOptions): Promise<boolean>;

}


export class SendEmail implements SendEmailUseCase {

    constructor(
        private readonly sendEmailRepository: SendEmailRepository,
    ) { }

    async execute(options: SendMailOptions): Promise<boolean> {

        return await this.sendEmailRepository.sendEmail(options);


    }



}