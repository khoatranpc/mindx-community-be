import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./service";
import { AuthenticatedType, User } from "./type";
import { CreateUserInput, UserAuthenticateInput } from "./dto";
import { GraphqlException } from "src/customs/GraphqlException";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) { }

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
    @Mutation((returns) => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {

        return await this.userService.createrUser(createUserInput);
    }

    @Mutation(returns => AuthenticatedType)
    async authenticated(@Args('userAuthenticateInput') userAuthenticateInput: UserAuthenticateInput) {
        return await this.userService.authenticateUser(userAuthenticateInput);
    }

}