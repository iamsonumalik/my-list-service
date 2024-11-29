import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
