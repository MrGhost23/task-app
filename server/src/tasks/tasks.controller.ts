import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
    const tasks = await this.tasksService.getAllTasksByUser(req.user.userId);
    return tasks.map((task) => this.mapTaskResponse(task, req.user.userId));
  }
}
