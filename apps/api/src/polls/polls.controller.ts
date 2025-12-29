import { Controller, Get, Logger, Post } from '@nestjs/common';

@Controller('polls')
export class PollsController {
    @Post()
    async create() {
        Logger.log('In create!')
    }

    @Post('/join')
    async join() {
        Logger.log("Joined")
    }

    @Post('/rejoin')
    async rejoin() {
        Logger.log("Rejoined")
    }
}
