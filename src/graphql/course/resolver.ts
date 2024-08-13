import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CourseService } from "./service";
import { Course } from "./type";
import { CreateCourseInput } from "./dto";
import { GqlAuthGuard, RolesGuard } from "src/global/auth/auth.guard";
import { Role } from "src/global/enum";

@Resolver()
export class CourseResolver {
    constructor(readonly courseService: CourseService) { }

    @Query(returns => [Course], { nullable: true })
    async listCourse() {
        return await this.courseService.listCourse();
    }
    @UseGuards(GqlAuthGuard, new RolesGuard([Role.ADMIN]))
    @Mutation(returns => Course, { nullable: true })
    async createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
        return this.courseService.createCourse(createCourseInput);
    }
}