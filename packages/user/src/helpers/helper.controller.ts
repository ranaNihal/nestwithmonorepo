import { Body, Controller, Get, Request } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HelpersService } from './helpers.service';

@Controller()
export class HelperController {
  constructor(
    private readonly helperService: HelpersService) { }

    @MessagePattern({ cmd: 'ErrorResponce' })
    ErrorResponce(message) {
      return this.helperService.ErrorResponce(message);
      }


    @MessagePattern({ cmd: 'SuccessResponce' })
    SuccessResponce(message,data): any {
    try {
      return this.helperService.SuccessResponce(message,data);
    } catch (error) {
      console.log(error);
    }
  }
}
