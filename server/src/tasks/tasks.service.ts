import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/User.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<any>) {}

  async createTask(
    title: string,
    description: string,
    dueDate: Date,
    category: string,
    createdBy: User,
  ) {
    const task = await this.taskModel.create({
      title,
      description,
      dueDate,
      category,
      createdBy,
    });
    return task;
  }

  async getAllTasksByUser(userId: string) {
    const tasks = await this.taskModel.find({ createdBy: userId }).exec();
    return tasks;
  }
}
