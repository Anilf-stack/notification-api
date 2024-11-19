import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum NotificationType {
  MARKETING = 'marketing',
  NEWSLETTER = 'newsletter',
  UPDATES = 'updates',
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class NotificationLog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: Object.values(NotificationType) })
  type: NotificationType;

  @Prop({ required: true, enum: Object.values(NotificationChannel) })
  channel: NotificationChannel;

  @Prop({ required: true, enum: Object.values(NotificationStatus), default: NotificationStatus.PENDING })
  status: NotificationStatus;

  @Prop()
  sentAt?: Date;

  @Prop()
  failureReason?: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  constructor(partial: Partial<NotificationLog>) {
    super();
    Object.assign(this, partial);  
  }
}

export const NotificationLogSchema = SchemaFactory.createForClass(NotificationLog);
