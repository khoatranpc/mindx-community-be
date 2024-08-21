import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { Collections } from "src/global/collection";
import { generateOTP } from "src/utils";

@Schema()
export class UserOTP extends Document {
    @Prop({ type: mongoose.Types.ObjectId, required: true, ref: Collections.USERS })
    userId: ObjectId;

    @Prop({ type: String, default: generateOTP() })
    otp: String;

    @Prop({ type: Number, default: Date.now })
    createdAt: Number;

    @Prop({ type: Boolean, default: true })
    hasSent: Boolean;
}

const UserOTPSchema = SchemaFactory.createForClass(UserOTP);
export default UserOTPSchema;