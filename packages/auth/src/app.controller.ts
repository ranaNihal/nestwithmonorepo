import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd:"signup"})
  signup(req): any {
    try {
            console.log(req);

      return this.appService.signup(req);
    } catch (error) {
      console.log(error);
    }
  }
}
