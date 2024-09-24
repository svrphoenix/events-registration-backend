import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findOne({ _id: id }).exec();
  }
}
