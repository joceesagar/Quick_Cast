import { Injectable } from '@nestjs/common';
import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';

@Injectable()
export class PollsService {
    async createPoll(fields: CreatePollFields) { }

    async joinPoll(fields: JoinPollFields) { }

    async rejoinPoll(fields: RejoinPollFields) { }
}
