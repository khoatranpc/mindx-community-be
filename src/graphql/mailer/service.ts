import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Collections } from "src/global/collection";
import { Mail } from "./schema";
import { MailInput } from "./type";

@Injectable()
export class MailService {
    constructor(@InjectModel(Collections.MAILS) private mailModel: Model<Mail>) { }

    async createMailTemplate(dataMail: MailInput) {
        return this.mailModel.create(dataMail);
    }

    async getMailById(id: string) {
        return this.mailModel.findById(id);
    }
}