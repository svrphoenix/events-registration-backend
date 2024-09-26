import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';

export enum SOURCE {
  SOCIAL = 'Social',
  FRIENDS = 'Friends',
  MYSELF = 'Myself',
}

class ParticipantEvent {
  @IsOptional()
  @IsEnum(SOURCE)
  readonly eventSource: string;

  @IsObjectId()
  readonly eventId: string;
}

export class CreateParticipantDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  readonly fullName: string;

  @IsEmail()
  @MaxLength(30)
  @IsNotEmpty()
  readonly email: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly birthDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantEvent)
  readonly events: ParticipantEvent[];
}
