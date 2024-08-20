import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class MailInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Title of mail template is required!' })
    title: string;


    @IsNotEmpty({ message: 'Content HTML is required!' })
    html: string;
}

@InputType()
export class GetOneMail{
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Id of mail template is required!' })
    id: string
}

@ObjectType()
export class MailObjType {
    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    type: string;

    @Field({ nullable: true })
    html: string;
}