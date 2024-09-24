import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EventController } from './events.controller';
import { EventService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
