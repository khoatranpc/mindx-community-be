import { Module } from "@nestjs/common";
import { UserResolver } from "./resolver";
import { UserService } from "./service";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";
import { UserSchema } from "./schema";
import { MailService } from "../mailer/service";
import MailSchema from "../mailer/schema";
import UserOTPSchema from "../userOtp/schema";
import { UserOtpService } from "../userOtp/service";

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
            {
                name: Collections.USEROTPS,
                schema: UserOTPSchema
            },
        ])
    ],
    providers: [UserResolver, UserService, MailService, UserOtpService],
    exports: [UserService]
})
export class UserModule {

}