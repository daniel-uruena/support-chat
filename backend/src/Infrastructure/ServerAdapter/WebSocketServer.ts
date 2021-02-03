import socketIo from 'socket.io'
import { ChatEvent } from '../../Domain/Models/ChatEvent'
import { Message } from '../../Domain/Models/Message'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../IOC/types'
import { IChatUseCase } from '../../Domain/Interfaces/IChatUseCase'

@injectable()
export class WebSocketServer {

    private chatUseCase: IChatUseCase

    constructor(@inject(TYPES.ChatUseCase) chatUseCase: IChatUseCase) {
        this.chatUseCase = chatUseCase
    }

    registerListeners(io: socketIo.Server) {
        io.on(ChatEvent.CONNECT, (socket: any) => {
            console.log(socket)

            socket.on(ChatEvent.NEW_CHAT, (customer: string) => {
                console.log(customer)
            })

            socket.on(ChatEvent.MESSAGE, (message: Message) => {
                console.log(message)
            })

            socket.on(ChatEvent.DISCONNECT, () => {
                console.log('user disconnected')
            })
        })
    }
}
