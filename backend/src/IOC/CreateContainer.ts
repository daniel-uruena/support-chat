import { Container } from 'inversify'
import { IServer } from '../Domain/Interfaces/IServer'
import { TYPES } from './types'
import { ExpressServer } from '../Infrastructure/ServerAdapter/ExpressServer'
import { IConfig } from '../Domain/Interfaces/IConfig'
import { config } from '../Infrastructure/Config'
import { IChatUseCase } from '../Domain/Interfaces/IChatUseCase'
import { ChatUseCase } from '../Domain/ChatUseCases/ChatUseCase'
import { ITicketService } from '../Domain/Interfaces/ITicketService'
import { TicketService } from '../Infrastructure/TicketServiceAdapter/TicketService'
import { IWebSocketServer } from '../Domain/Interfaces/IWebSocketServer'
import { WebSocketServer } from '../Infrastructure/ServerAdapter/WebSocketServer'
import { IDatabase } from '../Domain/Interfaces/IDatabase'
import { MongoDatabase } from '../Infrastructure/DatabaseAdapter/MongoDatabase'

export const createContainer = (): Container => {
    let container = new Container()
    container.bind<IConfig>(TYPES.Config).toConstantValue(config)
    container.bind<IServer>(TYPES.Server).to(ExpressServer)
    container.bind<IChatUseCase>(TYPES.ChatUseCase).to(ChatUseCase)
    container.bind<ITicketService>(TYPES.TicketService).to(TicketService)
    container.bind<IWebSocketServer>(TYPES.WebSocketServer).to(WebSocketServer)
    container.bind<IDatabase>(TYPES.Database).to(MongoDatabase)

    return container
}
