import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/global/enum';

@Schema({
    timestamps: true
})
export class User extends Document {
    @Prop({ required: true, default: '' })
    userName: string;

    @Prop({ required: true, unique: true, })
    email: string;

    @Prop({ required: true, unique: true })
    phoneNumber: string;

    @Prop({ required: true, min: 6 })
    password: string;

    @Prop({ required: false, default: '' })
    address: string;

    @Prop({ default: '' })
    image: string;

    @Prop({ type: String })
    role: Role;

    @Prop({ required: false, default: '' })
    identityFrontImage: string;

    @Prop({ required: false, default: '' })
    identityBackImage: string;

    @Prop({ default: false })
    active: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);