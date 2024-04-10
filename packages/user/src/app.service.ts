import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserSchema } from './schemas/user.schema';
import { Model } from 'mongoose';
import { HelpersService } from './helpers/helpers.service';

@Injectable()
export class AppService {
    constructor(
        private readonly helper: HelpersService,
        @InjectModel("User") readonly userModel: Model<IUserSchema>

    ) { }
    async findUser(req) {
        try {
            const { name, email, password, roleId } = req.body
            let user = await this.userModel.findOne({ email });
            if (user) throw 'Email already exist! '

            let payload = { name, email, password, roleId }
            const saveuser = new this.userModel(payload);
            await saveuser.save();
            user = await this.userModel.findOne({ email }).lean();
            return user
        } catch (error) {
            console.log(error);
            
            return this.helper.ErrorResponce(error)
        }

    }
}
