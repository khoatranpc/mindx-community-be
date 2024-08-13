import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class courseSchema extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true })
    des: string;

    @Prop({ default: true })
    active: boolean;

    @Prop({ default: false })
    isDelete: boolean;
}
export const CourseSchema = SchemaFactory.createForClass(courseSchema);