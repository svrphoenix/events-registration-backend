import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { Participant } from './schemas/participant.schema';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly partycipantService: ParticipantsService) {}

  @Post()
  async createEvent(
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return await this.partycipantService.createParticipant(
      createParticipantDto,
    );
  }

  @Get('/eventid?')
  async findByEvent(
    @Query('id', IsObjectIdPipe) id: string,
  ): Promise<Participant[]> {
    return this.partycipantService.findByEvent(id);
  }
}
