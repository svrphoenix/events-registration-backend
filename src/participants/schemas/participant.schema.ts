import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { SOURCE } from '../dto/create-participant.dto';

const defaultBirthDate = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear() - 18;

  return `${yyyy}-${mm}-${dd}`;
};

@Schema({ _id: false, versionKey: false })
class ParticipantEvent {
  @Prop({
    required: true,
    type: String,
    enum: [SOURCE.SOCIAL, SOURCE.FRIENDS, SOURCE.MYSELF],
    default: SOURCE.SOCIAL,
  })
  eventSource: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Event', required: true })
  eventId: Event;
}

const ParticipantEventSchema = SchemaFactory.createForClass(ParticipantEvent);

@Schema({
  versionKey: false,
})
export class Participant {
  @Prop({
    required: true,
  })
  fullName: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    default: defaultBirthDate(),
  })
  birthDate: Date;

  @Prop([{ type: ParticipantEventSchema }])
  events: ParticipantEvent[];
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
