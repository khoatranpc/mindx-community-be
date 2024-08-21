import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MailerService } from '@nestjs-modules/mailer';
import { FilterQuery, Model } from "mongoose";
import { Collections } from "src/global/collection";
import { GraphqlException } from "src/customs/GraphqlException";
import { Mail } from "./schema";
import { FindMailTemplateByIdAndUpdate, MailInput, MailObjType } from "./type";

@Injectable()
export class MailService {
    constructor(@InjectModel(Collections.MAILS) private mailModel: Model<Mail>, private readonly mailerService: MailerService) { }

    async createMailTemplate(dataMail: MailInput) {
        try {
            return await this.mailModel.create(dataMail);
        } catch (error) {
            if (error) {
                if (error.errorResponse && error.errorResponse.code == 11000) {
                    if (error.errorResponse.keyPattern['title'] === 1) {
                        throw new GraphqlException({
                            statusCode: 403
                        }, 'title of mail template already exists!');
                    }
                }
            }
            throw new GraphqlException({
                statusCode: 403
            }, error.message);
        }
    }

    async getMailById(id: string) {
        return this.mailModel.findById(id);
    }

    async getOneEmail(filter: FilterQuery<Mail>) {
        return this.mailModel.findOne(filter);
    }

    async getListMailTemplate() {
        return this.mailModel.find({});
    }

    async findMailTemplateByIdAndUpdate(id: string, newData: FindMailTemplateByIdAndUpdate) {
        try {
            return this.mailModel.findByIdAndUpdate(id, newData);
        } catch (error) {
            throw new GraphqlException({
                statusCode: 403
            }, error.message);
        }
    }
    async sendMail(mail: {
        html: string,
        title: string
    }, to: string) {
        return await this.mailerService.sendMail({
            html: mail.html,
            subject: mail.title,
            to: to
        });
    }
}