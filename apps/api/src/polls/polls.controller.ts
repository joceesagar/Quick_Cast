import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './dtos.js';
import { PollsService } from './polls.service.js';

@Controller('polls')
export class PollsController {
    constructor(private pollsService: PollsService) { }
    @Post()
    async create(@Body() createPollDto: CreatePollDto) {
        return await this.pollsService.createPoll(createPollDto)
    }

    @Post('/join')
    async join(@Body() JoinPollDto: JoinPollDto) {
        return await this.pollsService.joinPoll(JoinPollDto)
    }

    @Post('/rejoin')
    async rejoin() {
        Logger.log("Rejoined")
    }
}
