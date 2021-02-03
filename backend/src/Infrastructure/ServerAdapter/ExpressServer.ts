import { IServer } from '../../Domain/Interfaces/IServer'
import { IConfig } from '../../Domain/Interfaces/IConfig'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '../../IOC/types'
import express, { Express } from 'express'
import socketIo from 'socket.io'
import { createServer, Server } from 'http'
import cors from 'cors'
import { IWebSocketServer } from '../../Domain/Interfaces/IWebSocketServer'

@injectable()
export class ExpressServer implements IServer {
    private io: socketIo.Server
    public app: Express
    private config: IConfig
    private server: Server
    private webSocketSever: IWebSocketServer

    constructor(@inject(TYPES.Config) config: IConfig,
                @inject(TYPES.WebSocketServer) webSocketServer: IWebSocketServer) {
        this.webSocketSever = webSocketServer
        this.app = express()
        this.app.use(cors({ origin: '*', methods: 'ALL' }))
        this.server = createServer(this.app)
        this.config = config
        // @ts-ignore
        this.io = socketIo(this.server)
    }

    start(): void {
        this.app.listen(this.config.serverPort, () => {
            console.log(`Servidor corriendo en http://localhost:${this.config.serverPort}`)
        })

        this.webSocketSever.registerListeners(this.io)
    }
}
