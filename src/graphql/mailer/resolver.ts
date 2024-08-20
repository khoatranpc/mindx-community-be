import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard, RolesGuard } from "src/global/auth/auth.guard";
import { Role } from "src/global/enum";
import { MailService } from "./service";
import { GetOneMail, MailInput, MailObjType } from "./type";

@Resolver()
export class MailResolver {
    constructor(private readonly mailService: MailService) { }

    @Query(() => MailObjType, { nullable: true })
    async getOneMail(@Args('conditional') conditional: GetOneMail) {
        return this.mailService.getMailById(conditional.id);
    }

    @Query(() => [MailObjType], { nullable: true, defaultValue: [] })
    async getListMail() {
        return this.mailService.getListMailTemplate();
    }
    @UseGuards(GqlAuthGuard, new RolesGuard([Role.ADMIN]))
    @Mutation(() => MailObjType, { nullable: true })
    async createMailTemplate(@Args('newMailTemplate') newMailTemplate: MailInput) {
        return this.mailService.createMailTemplate(newMailTemplate);
    }
}