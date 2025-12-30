import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './dtos';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
    constructor(private pollsService: PollsService) { }
    @Post()
    async create(@Body() createPollDto: CreatePollDto) {
        Logger.log('In create!');
        return createPollDto
    }

    @Post('/join')
    async join(@Body() JoinPollDto: JoinPollDto) {
        Logger.log("In Join!")
        return JoinPollDto
    }

    @Post('/rejoin')
    async rejoin() {
        Logger.log("Rejoined")
    }
}
