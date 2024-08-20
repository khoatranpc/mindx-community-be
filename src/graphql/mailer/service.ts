import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Collections } from "src/global/collection";
import { GraphqlException } from "src/customs/GraphqlException";
import { Mail } from "./schema";
import { MailInput } from "./type";

@Injectable()
export class MailService {
    constructor(@InjectModel(Collections.MAILS) private mailModel: Model<Mail>) { }

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

    async getListMailTemplate() {
        return this.mailModel.find({});
    }
}