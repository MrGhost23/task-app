import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../JWT/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('dueDate') dueDate: Date,
    @Body('category') category: string,
    @Req() req,
  ) {
    const task = await this.tasksService.createTask(
      title,
      description,
      dueDate,
      category,
      req.user,
    );
    return this.mapTaskResponse(task, req.user._id);
  }

  private mapTaskResponse(task: any, createdBy: string) {
    return {
      taskId: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      isCompleted: task.isCompleted,
      category: task.category,
      createdBy: createdBy,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(@Req() req) {
    console.log(req.user);
    const tasks = await this.tasksService.getAllTasksByUser(req.user._id);
    return tasks.map((task) => this.mapTaskResponse(task, req.user._id));
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('dueDate') dueDate: Date,
    @Body('category') category: string,
  ) {
    return this.tasksService.updateTask(
      taskId,
      title,
      description,
      dueDate,
      category,
    );
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch(':id/completed')
  async updateIsCompleted(
    @Param('id') taskId: string,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.tasksService.updateIsCompleted(taskId, isCompleted);
  }
}
