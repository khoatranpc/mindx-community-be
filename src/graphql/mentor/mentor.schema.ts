import { Document, ObjectId } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Collections } from "src/global/collection";

@Schema()
export class mentorSchema extends Document {
    @Prop({ required: true, ref: Collections.USERS, type: String, unique: true })
    userId: ObjectId;

    @Prop({ required: true })
    title: String;

    @Prop({ required: true })
    courses: ObjectId[];

    @Prop({ required: true })
    cv: String;

    @Prop({ default: false })
    approval: Boolean;
}

export const MentorSchema = SchemaFactory.createForClass(mentorSchema);