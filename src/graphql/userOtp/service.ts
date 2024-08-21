import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Collections } from "src/global/collection";
import { UserOTP } from "./schema";

@Injectable()
export class UserOtpService {
    constructor(@InjectModel(Collections.USEROTPS) private readonly userOtpModel: Model<UserOTP>) { }

    async getListOtp() {
        return await this.userOtpModel.find();
    }

    async getOneOtpByUserId(id: ObjectId) {
        const crrOtp = await this.userOtpModel.findOne({
            userId: id
        });
        return crrOtp;
    }

    async createOtpWithUserId(id: ObjectId) {
        const otp = await this.userOtpModel.create({
            userId: id,
        });
        return otp;
    }
}

