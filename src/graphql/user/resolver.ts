import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlException } from "src/customs/GraphqlException";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/global/auth/auth.guard";
import { UserService } from "./service";
import { AuthenticatedType, OtpSent, User } from "./type";
import { CreateUserInput, CurrentUserIdInput, GetOTPInput, UserAuthenticateInput } from "./dto";
import { MailService } from "../mailer/service";
import { MailObjType } from "../mailer/type";
import { replacements } from "src/utils";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService, private readonly mailService: MailService) { }

    // Queries
    @Query(() => [User], { nullable: true, defaultValue: [] })
    getAllUser() {
        return this.userService.getAllUser();
    }
    @Query(() => String)
    getTest(): string {
        throw new GraphqlException({
            statusCode: 401
        }, 'test error');
    }

    // Mutations
    @Mutation((returns) => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return await this.userService.createrUser(createUserInput);
    }

    // login
    @Mutation(returns => AuthenticatedType)
    async authenticated(@Args('userAuthenticateInput') userAuthenticateInput: UserAuthenticateInput) {
        return await this.userService.authenticateUser(userAuthenticateInput);
    }
    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => User)
    async getUser(@Context() context, @Args('currentUserIdInput') currentUserIdInput: CurrentUserIdInput) {
        const getCrrUser = context.req.user;
        const getUserIdQuery = currentUserIdInput.userId;
        return await this.userService.getCrrUser(getCrrUser._id as string, getUserIdQuery);
    }

    @Mutation(() => OtpSent, { nullable: true })
    async getOtpResetPassword(@Args('user') user: GetOTPInput) {
        const crrUser = await this.userService.findUserByEmail(user.email);
        if (!crrUser) throw new GraphqlException({
            statusCode: 400
        }, 'User is not exist!');
        const crrMailTemplate = await this.mailService.getOneEmail({ type: 'OTP_RESETPASS' });
        const value = [crrUser.email, new Date().toLocaleString(), '567832'];
        const getContentMail = replacements(crrMailTemplate.html, '{{REPLACE}}', value);
        await this.mailService.sendMail({
            title: crrMailTemplate.title,
            html: getContentMail,
        }, crrUser.email);
        return {
            message: `OTP has been sent to ${crrUser.email}`
        };
    }
}