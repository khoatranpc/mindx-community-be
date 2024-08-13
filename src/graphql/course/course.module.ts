import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";
import { CourseSchema } from "./schema";
import { CourseResolver } from "./resolver";
import { CourseService } from "./service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Collections.COURSES,
                schema: CourseSchema
            }
        ])
    ],
    providers: [CourseResolver, CourseService],
    exports: [CourseService]
})
export class CourseModule { };