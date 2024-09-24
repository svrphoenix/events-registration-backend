import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { EventService } from './events.service';
import { Event } from './schemas/event.schema';
import { NotFoundInterceptor } from 'src/interceptors/not-found.interceptor';
import { IsObjectIdPipe } from 'nestjs-object-id';

@Controller('events')
@UseInterceptors(new NotFoundInterceptor('No event found for given id', 'id'))
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Res() response, @Body() createEventDto: CreateEventDto) {
    try {
      const newEvent = await this.eventService.createEvent(createEventDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Event has been created successfully',
        newEvent,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Event not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', IsObjectIdPipe)
    id: string,
  ): Promise<Event> {
    return this.eventService.findOne(id);
  }
}
