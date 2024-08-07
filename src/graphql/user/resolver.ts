import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./service";
import { AuthenticatedType, User } from "./type";
import { CreateUserInput, UserAuthenticateInput } from "./dto";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => [User], { nullable: true, defaultValue: [] })
    getAllUser() {
        return this.userService.getAllUser();
    }

    @Mutation((returns) => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {

        return await this.userService.createrUser(createUserInput);
    }

    @Mutation(returns => AuthenticatedType)
    async authenticated(@Args('userAuthenticateInput') userAuthenticateInput: UserAuthenticateInput) {
        return await this.userService.authenticateUser(userAuthenticateInput);
    }

}