import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/global/enum';

@InputType()
export class CreateUserInput {
    @Field(() => ID, { nullable: true, defaultValue: '' })
    _id: string;

    @IsNotEmpty({
        message: 'User name is required!',
    })
    @Field({ nullable: true })
    userName: string;

    @IsNotEmpty({
        message: 'Email is required!',
    })
    @IsEmail()
    @Field({ nullable: true })
    email: string;

    @IsNotEmpty({
        message: 'Phone number is required!',
    })
    @Field({ nullable: true })
    phoneNumber: string;

    @IsNotEmpty({
        message: 'Password is required!',
    })
    @Field({ nullable: true })
    password: string;


    @Field({ nullable: true, defaultValue: '' })
    address: string;

    @Field({ nullable: true, defaultValue: '' })
    image: string;

    @Field({ nullable: true, defaultValue: Role.STUDENT })
    role: Role;

    @Field({ nullable: true, defaultValue: '' })
    identityFrontImage: string;

    @Field({ nullable: true, defaultValue: '' })
    identityBackImage: string;

    @Field({ nullable: true, defaultValue: false })
    active: boolean;
}

@InputType()
export class UserAuthenticateInput {
    @IsEmail()
    @Field({ nullable: true })
    email: string;

    @IsNotEmpty({
        message: 'Password is required!',
    })
    @Field({ nullable: true })
    password: string;
}