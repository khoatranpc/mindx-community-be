import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { GraphQLError } from "graphql";
import { Collections } from "src/global/collection";
import { JwtService } from "@nestjs/jwt";
import { hashBcr } from "src/utils";
import { User } from "./schema";
import { CreateUserInput, UserAuthenticateInput } from "./dto";
import { GraphqlException } from "src/customs/GraphqlException";

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
            if (!getUserByEmail.active || getUserByEmail.isDelete) {
                throw { message: 'You can not access to system, Please contact with Admin - admin@mindx.com.vn!' };
            }
            const payload = { _id: getUserByEmail._id, userName: getUserByEmail.userName, role: getUserByEmail.role };
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        } catch (error) {
            throw new GraphqlException({ statusCode: 401 }, error.message);
        }
    }

    async getCrrUser(crrUserId: string, userIdQuery: string) {
        const crrUser = await this.userModel.findOne({
            _id: new mongoose.Types.ObjectId(userIdQuery ? userIdQuery : crrUserId),
        });
        if (!crrUser) throw new GraphqlException({ statusCode: 401 }, 'Not found user!');
        return crrUser.toObject();
    }

    async findUserByEmail(email: string) {
        const crrUser = await this.userModel.findOne({
            email: new RegExp(email, 'i')
        });
        return crrUser;
    }

    async resetPassword(email: string, newPassword: string, confirmPassword: string) {
        if (newPassword !== confirmPassword) {
            throw new GraphqlException({
                statusCode: 400
            }, 'Password is not match!');
        }
        const crrUser = await this.userModel.findOne({ email });
        if (!crrUser) {
            throw new GraphqlException({
                statusCode: 500
            }, 'Not found user!');
        }
        const createNewHashPassword = hashBcr.hashing(newPassword);
        crrUser.password = createNewHashPassword;
        await crrUser.save();
        return crrUser;
    }
}