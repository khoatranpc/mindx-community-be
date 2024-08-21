import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";
import MailSchema from "./schema";
import { MailService } from "./service";
import { MailResolver } from "./resolver";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Collections.MAILS,
                schema: MailSchema
            }
        ])
    ],
    providers: [MailResolver, MailService],
    exports: [MailService]
})
export class MailModule { }