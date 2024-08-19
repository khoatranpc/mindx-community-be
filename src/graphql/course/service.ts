import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { Collections } from "src/global/collection";
import { CreateCourseInput } from "./dto";
import { courseSchema } from "./schema";
import { GraphqlException } from "src/customs/GraphqlException";

@Injectable()
export class CourseService {
    constructor(@InjectModel(Collections.COURSES) private courseModel: Model<courseSchema>, private jwtService: JwtService) { }

    async listCourse() {
        return await this.courseModel.find();
    }

    async createCourse(createCourseInput: CreateCourseInput) {
        try {
            return await this.courseModel.create(createCourseInput);
        } catch (error) {
            if (error) {
                if (error.errorResponse && error.errorResponse.code == 11000) {
                    if (error.errorResponse.keyPattern['name'] === 1 || error.errorResponse.keyPattern['code'] === 1) {
                        throw new GraphqlException({
                            statusCode: 403
                        }, 'Name or Code of course already exists!');
                    }
                }
            }
            throw new GraphqlException({
                statusCode: 403
            }, error.message);
        }
    }
}