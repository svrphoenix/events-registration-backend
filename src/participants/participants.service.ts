import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './schemas/participant.schema';
import { Model } from 'mongoose';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}

  async createParticipant(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    const newParticipant = new this.participantModel(createParticipantDto);

    const existParticipant = await this.participantModel.findOne({
      email: newParticipant.email,
    });

    if (existParticipant) {
      const { _id: id, events } = existParticipant;
      const { events: newEvents, fullName, birthDate } = newParticipant;

      if (
        events.findIndex(
          ({ eventId }) => String(eventId) === String(newEvents[0].eventId),
        ) === -1
      ) {
        events.push(newEvents[0]);

        return this.participantModel.findByIdAndUpdate(
          id,
          {
            fullName,
            birthDate,
            events: events,
          },
          {
            new: true,
          },
        );
      } else
        throw new UnprocessableEntityException(
          'This registration already exists',
        );
    }

    return newParticipant.save();
  }

  async findByEvent(eventId: string): Promise<Participant[]> {
    return this.participantModel
      .find({ 'events.eventId': eventId }, { events: 0 })
      .exec();
  }
}
