import { Module } from "@nestjs/common";
import { UserResolver } from "./resolver";
import { UserService } from "./service";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";
import { UserSchema } from "./schema";
import { MailService } from "../mailer/service";
import MailSchema from "../mailer/schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Collections.USERS,
                schema: UserSchema
            },
            {
                name: Collections.MAILS,
                schema: MailSchema
            },
        ])
    ],
    providers: [UserResolver, UserService, MailService],
    exports: [UserService]
})
export class UserModule {

}