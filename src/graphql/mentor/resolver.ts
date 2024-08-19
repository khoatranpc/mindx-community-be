import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { MentorService } from "./service";
import { CreateMenoterInputType, GetListMentorArgs, Mentor } from "./type";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard, RolesGuard } from "src/global/auth/auth.guard";
import { Role } from "src/global/enum";

@Resolver()
export class MentorResolver {
    constructor(readonly mentorService: MentorService) { }

    @Query(() => [Mentor])
    async getListMentor(@Args('conditional') conditional: GetListMentorArgs) {
        return await this.mentorService.getListMentor(conditional);
    }

    @UseGuards(GqlAuthGuard, new RolesGuard([Role.ADMIN]))
    @Mutation(() => Mentor, { nullable: true })
    async createMentor(@Args('mentor') mentor: CreateMenoterInputType) {
        return this.mentorService.createMentor(mentor);
    }
}