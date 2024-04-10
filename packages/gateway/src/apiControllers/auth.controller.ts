import { Controller, Post, Body, Inject, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) { }


    @Post('signup')
    async signup(@Body() @Request() req) {
        try {
            console.log(req);
            
            return this.authClient.send({cmd:'signup'}, { body: req }).toPromise();
        } catch (error) {
            console.log(error);
        } 
    }
}
