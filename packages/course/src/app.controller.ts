import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('allCourses')
  async allCourses(): Promise<any> {
    return  await this.appService.allCourses()
  }

  @MessagePattern('courseById')
  async course(courseId): Promise<any> {
    return await this.appService.course(courseId.courseId)
  }
}
