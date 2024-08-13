import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CourseService } from "./service";
import { Course } from "./type";
import { CreateCourseInput } from "./dto";
import { GqlAuthGuard } from "src/global/auth/auth.guard";

@Resolver()
export class CourseResolver {
    constructor(readonly courseService: CourseService) { }

    @Query(returns => [Course], { nullable: true })
    async listCourse() {
        return await this.courseService.listCourse();
    }
    @UseGuards(GqlAuthGuard)
    @Mutation(returns => Course, { nullable: true })
    async createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
        return this.courseService.createCourse(createCourseInput);
    }
}