import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCourseInput {
    // @Field(() => ID, { nullable: true })
    // _id: string;

    @IsNotEmpty({ message: 'Name of course is required!' })
    @Field({ nullable: true })
    name: string;

    @IsNotEmpty({ message: 'Code of course is required!' })
    @Field({ nullable: true })
    code: string;

    @IsNotEmpty({ message: 'Description of course is required!' })
    @Field({ nullable: true })
    des: string;
}