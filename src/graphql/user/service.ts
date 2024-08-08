import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { GraphQLError } from "graphql";
import { Collections } from "src/global/collection";
import { JwtService } from "@nestjs/jwt";
import { User } from "./schema";
import { CreateUserInput, UserAuthenticateInput } from "./dto";
import { hashBcr } from "src/utils";

@Injectable()
export class UserService {
    constructor(@InjectModel(Collections.USERS) private userModel: Model<User>, private jwtService: JwtService) { }

    async getAllUser() {
        return await this.userModel.find();
    }
    async createrUser(newUser: CreateUserInput): Promise<User> {
        try {
            const dataNewUser = {
                ...newUser,
                password: hashBcr.hashing(newUser.password),
                _id: new mongoose.Types.ObjectId()
            }
            const createdUser = await this.userModel.create(dataNewUser);
            return createdUser;
        } catch (error) {
            if (error) {
                if (error.errorResponse && error.errorResponse.code == 11000) {
                    if (error.errorResponse.keyPattern['email'] === 1) {
                        throw new GraphQLError('Email already exists!');
                    }
                }
            }
            throw new GraphQLError(error.message);
        }
    }
    async authenticateUser(authData: UserAuthenticateInput): Promise<{ access_token: string }> {
        try {
            const getUserByEmail = await this.userModel.findOne({ email: authData.email });
            if (!getUserByEmail) throw { message: 'Email or password is incorrect!' };
            const comparePassword = hashBcr.compare(authData.password, getUserByEmail.password);
            if (!comparePassword) throw { message: 'Email or password is incorrect!' };
            const payload = { sub: getUserByEmail._id, username: getUserByEmail.userName };
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    statusCode: 401
                }
            });
        }
    }
}