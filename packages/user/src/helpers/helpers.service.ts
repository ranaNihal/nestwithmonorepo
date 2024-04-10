import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  constructor(
  ) { }

  ErrorResponce(message) { 
    if(typeof message == 'object'){
      message = message.message || message
    }
    return { success: false, code: 400, message } }

  SuccessResponce(message, data) {
    return {
      success: true,
      code: 200,
      message,
      data
    }
  }
}
