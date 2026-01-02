import { Injectable } from '@nestjs/common';
import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types.js';
import { createPollID, createUserID } from '../ids.js';

@Injectable()
export class PollsService {
    async createPoll(fields: CreatePollFields) {
        const pollID = createPollID()
        const userID = createUserID()

        return {
            ...fields,
            userID,
            pollID
        }
    }

    async joinPoll(fields: JoinPollFields) {
        const userID = createUserID()

        return {
            ...fields,
            userID
        }
    }

    async rejoinPoll(fields: RejoinPollFields) { }
}
