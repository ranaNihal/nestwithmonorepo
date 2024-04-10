import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import { buyCourseSchema } from './schema/buyCourse.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([
      {
        name: 'Course',
        schema: CourseSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'BuyCourse',
        schema: buyCourseSchema,
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
