import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Event {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    default: new Date(),
  })
  eventDate: Date;

  @Prop({
    required: true,
  })
  organizer: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
