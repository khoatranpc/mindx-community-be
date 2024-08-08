import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlException } from "src/customs/GraphqlException";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/global/auth/auth.guard";
import { UserService } from "./service";
import { AuthenticatedType, User } from "./type";
import { CreateUserInput, CurrentUserIdInput, UserAuthenticateInput } from "./dto";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) { }

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
}