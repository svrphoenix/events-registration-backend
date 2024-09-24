import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  readonly description: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly eventDate: Date;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly organizer: string;
}
