import { ClientsModule } from "@nestjs/microservices";
import { ConfigService } from "../config/config.service";

const ClientRegisters = [

    ClientsModule.register([
        {
            name: 'USER_SERVICE',
            ...new ConfigService().get('redisService')
        }
    ])
]

export { ClientRegisters } 