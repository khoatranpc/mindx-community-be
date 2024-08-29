import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

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

@ObjectType()
export class Message {
    @Field({ nullable: true })
    message: string;
}

@InputType()
export class ResetPasswordOTP {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'OTP is required!' })
    otp: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Email is required!' })
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'New password is required!' })
    newPassword: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Confirm password is required!' })
    confirmPassword: string;
}