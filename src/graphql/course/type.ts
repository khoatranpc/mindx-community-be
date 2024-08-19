import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Course {
    @Field(() => ID)
    _id: string;

    @Field()
    name: string;

    @Field()
    code: string;

    @Field()
    des: string;

    @Field()
    active: boolean;

    @Field()
    isDelete: boolean;
}