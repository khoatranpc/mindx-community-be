import { Module } from "@nestjs/common";
import { UserResolver } from "./resolver";
import { UserService } from "./service";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";
import { UserSchema } from "./schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Collections.USERS,
                schema: UserSchema
            }
        ])
    ],
    providers: [UserResolver, UserService],
    exports: [UserService]
})
export class UserModule {

}