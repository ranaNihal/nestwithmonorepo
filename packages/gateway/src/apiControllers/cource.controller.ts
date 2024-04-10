import { Controller, Post, Body, Inject, Request, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('course')
export class CourseController {
    constructor(
        @Inject('COURSE_SERVICE') private readonly courseClient: ClientProxy
    ) { }

    @Get('allCourses')
    async gets(): Promise<any> {
        return this.courseClient.send( 'allCourses', {}).toPromise();
    }

    @Get(':id')
    async get(@Param('id') courseId): Promise<any> {
        const data = await this.courseClient.send( 'courseById', {courseId}).toPromise();
        return data[0]
    }
}