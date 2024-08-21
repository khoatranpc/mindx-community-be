import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class MailInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Title of mail template is required!' })
    title: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Content HTML is required!' })
    html: string;
}

@InputType()
export class GetOneMail {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Id of mail template is required!' })
    id: string
}

@InputType()
export class FindMailTemplateByIdAndUpdate {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Id of mail template is required!' })
    id: string;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    html: string;

    @Field({ nullable: true })
    isDelete: string;
}


@ObjectType()
export class MailObjType {
    @Field(() => ID, { nullable: true })
    _id: string;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    html: string;

    @Field({ nullable: true })
    isDelete: string;
}