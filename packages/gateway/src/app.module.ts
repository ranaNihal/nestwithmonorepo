import { Module } from '@nestjs/common';
import { ClientRegisters } from './clients/registers';
import { AuthController } from './apiControllers/auth.controller';
import { CourseController } from './apiControllers/cource.controller';

@Module({
  imports: [...ClientRegisters],
  controllers: [ AuthController, CourseController],
  providers: [],
})
export class AppModule {}
