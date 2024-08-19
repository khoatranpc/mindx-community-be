import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@ObjectType()
export class Mentor {
    @Field(() => ID, { nullable: true })
    _id: string;

    @Field(() => ID, { nullable: true })
    userId: string;

    @Field({ nullable: true })
    title: string;

    @Field(() => [ID], { nullable: true })
    courses: string[];

    @Field()
    cv: string;

    @Field()
    approval: Boolean;
}

@InputType()
export class GetListMentorArgs {
    @Field({ nullable: true })
    approval: boolean;
}

@InputType()
export class CreateMenoterInputType {
    @Field(() => ID, { nullable: true })
    _id: string;

    @Field(() => ID, { nullable: true })
    userId: string;

    @IsNotEmpty({ message: "Mentor's title is required!" })
    @Field({ nullable: true })
    title: string;

    @IsNotEmpty({ message: "Mentor's courses is required!" })
    @Field(() => [ID], { nullable: true, defaultValue: [] })
    courses: string[];

    @IsNotEmpty({ message: "Mentor's cv is required!" })
    @Field({ nullable: true })
    cv: string;

    @Field({ defaultValue: false })
    approval: Boolean;
}