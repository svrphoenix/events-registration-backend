import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { IPaginatedResponse } from './events.controller';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async findAll(limit: number, skip: number): Promise<IPaginatedResponse> {
    const countTotal = await this.eventModel.countDocuments({}).exec();
    const pageTotal = Math.floor((countTotal - 1) / limit) + 1;
    const data = await this.eventModel.find().limit(limit).skip(skip).exec();

    return { data, countTotal, pageTotal };
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findOne({ _id: id }).exec();
  }
}
