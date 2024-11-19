import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserPreferenceService } from '../services/user-preference.service';
import { CreateUserPreferenceDto, UpdateUserPreferenceDto } from '../dtos/user-preference.dto';

@Controller('preferences')
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @Post()
  async create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.userPreferenceService.create(createUserPreferenceDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.userPreferenceService.findOne(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.userPreferenceService.update(userId, updateUserPreferenceDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return this.userPreferenceService.delete(userId);
  }
}
