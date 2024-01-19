import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmpty } from 'class-validator';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  @IsEmpty()
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default:
      'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
  })
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
