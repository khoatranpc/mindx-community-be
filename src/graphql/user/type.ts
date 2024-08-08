import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    _id: string;

    @Field({ nullable: true })
    userName: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    phoneNumber: string;

    @Field({ nullable: true })
    password: string;

    @Field({ nullable: true })
    address: string;

    @Field({ nullable: true })
    image: string;

    @Field({ nullable: true })
    role: string;

    @Field({ nullable: true })
    identityFrontImage: string;

    @Field({ nullable: true })
    identityBackImage: string;

    @Field({ nullable: true })
    active: boolean;
}

@ObjectType()
export class AuthenticatedType {
    @Field({ nullable: true })
    access_token: string;
}