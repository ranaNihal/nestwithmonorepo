import { ClientsModule } from "@nestjs/microservices";
import { ConfigService } from "../config/config.service";

const ClientRegisters = [
    ClientsModule.register([
        {
            name: 'AUTH_SERVICE',
            ...new ConfigService().get('redisService')
        }
    ]),
    ClientsModule.register([
        {
            name: 'COURSE_SERVICE',
            ...new ConfigService().get('redisService')
        }
    ])
]

export { ClientRegisters } 