import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getAllUsers(): string {
    return 'Hello There';
  }

  @Post()
  createUser(): string {
    return 'Created User';
  }
}
