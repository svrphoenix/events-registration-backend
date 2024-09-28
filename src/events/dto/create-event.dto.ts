import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'IT Arena 2024',
    description: 'The title of the event',
  })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example:
      'There are 4 tracks waiting for you: Business, Technology, Product and Startup. The discussions will focus on AI technologies, cybersecurity, and green transition, and the cross-cutting topic will be defense tech. IT Arena will host leading speakers from more than 10 countries.',
    description: 'The description of the event',
  })
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  readonly description: string;

  @ApiPropertyOptional({
    example: '2024-09-27',
    description: 'The date of the event',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly eventDate: Date;

  @ApiProperty({
    example: 'ITCluster Lviv',
    description: 'The organizer of the event',
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly organizer: string;
}
