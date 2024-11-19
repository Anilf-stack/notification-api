import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from '../schemas/user.prefernce.model';
import { CreateUserPreferenceDto, UpdateUserPreferenceDto } from '../dtos/user-preference.dto';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectModel(UserPreference.name) private userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto) {
    const createdPreference = new this.userPreferenceModel(createUserPreferenceDto);
    return createdPreference.save();
  }

  async findOne(userId: string) {
    return this.userPreferenceModel.findOne({ userId });
  }

  async update(userId: string, updateUserPreferenceDto: UpdateUserPreferenceDto) {
    return this.userPreferenceModel.findOneAndUpdate({ userId }, updateUserPreferenceDto, {
      new: true,
    });
  }

  async delete(userId: string) {
    return this.userPreferenceModel.deleteOne({ userId });
  }
}

