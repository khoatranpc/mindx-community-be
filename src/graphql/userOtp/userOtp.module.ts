import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";
import UserSchema from "./schema";
import { UserOtpService } from "./service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Collections.USEROTPS,
                schema: UserSchema,
                collection: Collections.USEROTPS,
            }
        ])
    ],
    providers: [UserOtpService],
    exports: [UserOtpService]
})
export class UserOtp { }