import { Args, Query, Resolver } from "@nestjs/graphql";
import { MailService } from "./service";
import { GetOneMail, MailObjType } from "./type";

@Resolver()
export class MailResolver {
    constructor(private readonly mailService: MailService) { }

    @Query(() => MailObjType, { nullable: true })
    async getOneMail(@Args('conditional') conditional: GetOneMail) {
        return this.mailService.getMailById(conditional.id);
    }
}