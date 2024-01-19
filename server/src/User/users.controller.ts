import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './Dtos/login-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getAllUsers(): string {
    return 'Hello There';
  }

  // ...

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.usersService.create({
      ...rest,
      password: hashedPassword,
    });
    const payload = { username: user.username, sub: user.id };
    return {
      userId: user.id,
      username: user.username,
      image: user.image,
      access_token: this.jwtService.sign(payload),
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.validateUser(loginUserDto);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const userData = await this.usersService.getUserData(user.id);

    const userResponse = {
      userId: userData._id,
      username: userData.username,
      image: userData.image,
      fullName: userData.fullName,
    };

    return {
      ...userResponse,
      access_token: this.jwtService.sign(payload),
    };
  }
}
