import { Transport } from '@nestjs/microservices';
console.log("course======",process.env.REDIS_SERVICE_HOST,process.env.REDIS_SERVICE_PORT)

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;

    this.envConfig.redisService = {
      options: {
        host: process.env.REDIS_SERVICE_HOST,
        port: process.env.REDIS_SERVICE_PORT
      },
      transport: Transport.REDIS,
    }
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
