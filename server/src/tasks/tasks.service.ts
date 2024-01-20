import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateWriteOpResult } from 'mongoose';
import { User } from 'src/Schemas/User.schema';
import { TaskDocument } from './task.model';

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
    console.log('this is tasks', tasks);
    return tasks;
  }

  async updateTask(
    taskId: string,
    title: string,
    description: string,
    dueDate: Date,
    category: string,
  ): Promise<UpdateWriteOpResult> {
    const updatedTask = await this.taskModel.updateOne(
      { _id: taskId },
      {
        $set: {
          title,
          description,
          dueDate,
          category,
        },
      },
    );
    return updatedTask;
  }

  async deleteTask(taskId: string) {
    const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
    return deletedTask;
  }

  async updateIsCompleted(
    taskId: string,
    isCompleted: boolean,
  ): Promise<UpdateWriteOpResult> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      { _id: taskId },
      {
        $set: {
          isCompleted: isCompleted,
        },
      },
    );
    return updatedTask;
  }

  async filterTasks(
    filter: FilterQuery<TaskDocument>,
    userId: string,
  ): Promise<TaskDocument[]> {
    const { title, ...otherFilters } = filter;
    const tasks = await this.taskModel
      .find({
        ...otherFilters,
        createdBy: userId,
        ...(title && {
          title: { $regex: new RegExp(title, 'i') },
        }),
      })
      .sort({ createdAt: -1 })
      .exec();
    return tasks;
  }
}
