import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  ) { }

  @MessagePattern({ cmd: "findUser" })
  findUser(req) {
    return this.appService.findUser(req)
  }
}
