import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field()
    _id: string;

    @Field()
    userName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field()
    password: string;

    @Field()
    address: string;

    @Field()
    image: string;

    @Field()
    role: string;

    @Field()
    identityFrontImage: string;

    @Field()
    identityBackImage: string;

    @Field()
    active: boolean;
}

@ObjectType()
export class AuthenticatedType {
    @Field({ nullable: true })
    access_token: string;
}