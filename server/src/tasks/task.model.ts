import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../Schemas/User.schema';

export type TaskDocument = Task & Document;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  category: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;
  _id: any;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
