import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { SendNotificationDto } from '../dtos/notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    return this.notificationService.send(sendNotificationDto);
  }

  @Get(':userId/logs')
  async getLogs(@Param('userId') userId: string) {
    return this.notificationService.getLogs(userId);
  }

  @Get('stats')
  async getStats() {
    return this.notificationService.getStats();
  }
}
