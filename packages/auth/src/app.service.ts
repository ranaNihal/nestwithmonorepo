import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,

    private readonly jwtService: JwtService
  ) { }

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload)
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY, expiresIn: '1h' }); // Set access token expiration time
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY, expiresIn: '7d' }); // Set refresh token expiration time
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_KEY
    });
    delete payload.exp;
    return await this.generateAccessToken(payload);
  }

  async signup(req) {
    try {

      let user = await this.userClient.send({ cmd: 'findUser' }, { ...req }).toPromise()

      console.log(user,'usersss');
      
      // let access_token = await this.generateAccessToken(user)
      // let refresh_token = await this.generateRefreshToken(user)
      // return this.helper.SuccessResponce('signup successfull', { data, access_token, refresh_token })
    }
    catch (error) {
      console.log(error);
      // return this.helper.ErrorResponce(error)
    }
  }

}
