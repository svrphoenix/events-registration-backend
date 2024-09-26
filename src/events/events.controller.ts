import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { EventService } from './events.service';
import { Event } from './schemas/event.schema';
import { NotFoundInterceptor } from 'src/interceptors/not-found.interceptor';
import { IsObjectIdPipe } from 'nestjs-object-id';

export interface IPaginatedResponse {
  data: Event[];
  countTotal: number;
  pageTotal: number;
}

@Controller('events')
@UseInterceptors(new NotFoundInterceptor('No event found for given id', 'id'))
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventService.createEvent(createEventDto);
  }

  @Get()
  async findAll(
    @Query('limit') limitStr: string,
    @Query('skip') skipStr: string,
  ): Promise<IPaginatedResponse> {
    const limit = parseInt(limitStr) ? parseInt(limitStr) : 10;
    const skip = parseInt(skipStr) ? parseInt(skipStr) : 0;
    return this.eventService.findAll(limit, skip);
  }

  @Get(':id')
  async findOne(
    @Param('id', IsObjectIdPipe)
    id: string,
  ): Promise<Event> {
    return this.eventService.findOne(id);
  }
}
