import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreference, UserPreferenceSchema } from '../schemas/user.prefernce.model';
import { UserPreferenceService } from '../services/user-preference.service';
import { UserPreferenceController } from '../controllers/user-preference.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPreference.name, schema: UserPreferenceSchema }]),
  ],
  controllers: [UserPreferenceController],
  providers: [UserPreferenceService],
})
export class PreferencesModule {}
