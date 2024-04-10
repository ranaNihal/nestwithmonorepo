import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientRegisters } from './clients/registers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { HelpersService } from './helpers/helpers.service';

@Module({
  imports: [
    ...ClientRegisters,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, HelpersService]
})

export class AppModule { }
