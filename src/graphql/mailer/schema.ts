import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class Mail extends Document {
    @Prop({ type: String, required: true, unique: true })
    // tiêu đề email
    title: string;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: String, required: true })
    html: string;

    @Prop({ type: Boolean, default: false })
    isDelete: boolean;
}

const MailSchema = SchemaFactory.createForClass(Mail);
export default MailSchema;