import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { Collections } from "src/global/collection";
import { CreateCourseInput } from "./dto";
import { courseSchema } from "./schema";

@Injectable()
export class CourseService {
    constructor(@InjectModel(Collections.COURSES) private courseModel: Model<courseSchema>, private jwtService: JwtService) { }

    async listCourse() {
        return await this.courseModel.find();
    }

    async createCourse(createCourseInput: CreateCourseInput) {
        // return await this.courseModel.find(createCourseInput);
        return createCourseInput;
    }
}