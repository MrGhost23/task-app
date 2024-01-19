import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../Schemas/User.schema';
import { CreateUserDto } from './Dtos/create-user.dto';
import { LoginUserDto } from './Dtos/login-user.dto';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;
    const user = await this.userModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }

  async getUserData(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }
}
