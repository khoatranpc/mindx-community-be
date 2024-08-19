import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MentorResolver } from "./resolver";
import { Collections } from "src/global/collection";
import { MentorSchema } from "./mentor.schema";
import { MentorService } from "./service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Collections.MENTORS,
                schema: MentorSchema
            }
        ])
    ],
    providers: [MentorResolver, MentorService],
    exports: [MentorService]
})
export class MentorModule { }