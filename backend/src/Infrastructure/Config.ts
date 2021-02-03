import { IConfig } from '../Domain/Interfaces/IConfig'

export const config: IConfig = {
    serverPort: 3020,
    database: {
        protocol: 'mongodb',
        host: 'localhost',
        port: 27017,
        dbName: 'KBeChat',
        table: 'chat'
    }
}
