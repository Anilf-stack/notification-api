import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserPreference extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })
  email: string;

  @Prop({
    type: {
      marketing: Boolean,
      newsletter: Boolean,
      updates: Boolean,
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'never'] },
      channels: {
        email: Boolean,
        sms: Boolean,
        push: Boolean,
      },
    },
  })
  preferences: Record<string, any>;

  @Prop({ required: true })
  timezone: string;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);

