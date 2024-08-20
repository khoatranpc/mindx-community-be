import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";
import MailSchema from "./schema";
import { MailService } from "./service";
import { MailResolver } from "./resolver";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
        }),
        MongooseModule.forFeature([
            {
                name: Collections.MAILS,
                schema: MailSchema
            }
        ])
    ],
    providers: [MailResolver, MailService]
})
export class MailModule { }