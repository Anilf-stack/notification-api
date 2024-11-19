import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export enum NotificationFrequency {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    NEVER = 'never',
  }
  
  class ChannelsDto {
    @IsNotEmpty()
    email!: boolean;
  
    @IsNotEmpty()
    sms!: boolean;
  
    @IsNotEmpty()
    push!: boolean;
  }
  
  class PreferencesDto {
    @IsNotEmpty()
    marketing!: boolean;
  
    @IsNotEmpty()
    newsletter!: boolean;
  
    @IsNotEmpty()
    updates!: boolean;
  
    @IsEnum(NotificationFrequency)
    frequency!: NotificationFrequency;
  
    @ValidateNested()
    @Type(() => ChannelsDto)
    channels!: ChannelsDto;
  }
  
  export class CreateUserPreferenceDto {
    @IsNotEmpty()
    @IsString()
    userId!: string;
  
    @IsNotEmpty()
    @IsEmail()
    email!: string;
  
    @ValidateNested()
    @Type(() => PreferencesDto)
    preferences!: PreferencesDto;
  
    @IsNotEmpty()
    @IsString()
    timezone!: string;
  }
  
  export class UpdateUserPreferenceDto {
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => PreferencesDto)
    preferences?: PreferencesDto;
  
    @IsOptional()
    @IsString()
    timezone?: string;
  }
  
  