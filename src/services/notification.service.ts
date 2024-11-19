import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from '../schemas/notification.log.model';
import { SendNotificationDto } from '../dtos/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationLog.name) private notificationLogModel: Model<NotificationLog>,
  ) {}

  async send(sendNotificationDto: SendNotificationDto) {
    const { userId, type, channel, content } = sendNotificationDto;
    let status = 'pending';
    let sentAt: Date | null = null;
    let failureReason: string | null = null;

    try {
      if (channel === 'email') {
        console.log(`Sending email to ${userId} with subject: ${content.subject}`);
        status = 'sent';
        sentAt = new Date();
      } else {
        throw new Error('Channel not supported');
      }
    } catch (error) {
      const err = error as Error;
      status = 'failed';
      failureReason = err.message;
    }

    const log = new this.notificationLogModel({
      userId,
      type,
      channel,
      status,
      sentAt,
      failureReason,
      metadata: { content },
    });

    return log.save();
  }

  async getLogs(userId: string) {
    return this.notificationLogModel.find({ userId }).sort({ createdAt: -1 });
  }

  async getStats() {
    const stats = await this.notificationLogModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    return stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});
  }
}
