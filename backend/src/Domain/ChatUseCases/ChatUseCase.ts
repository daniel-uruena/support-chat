import { IDatabase } from '../Interfaces/IDatabase'
import { ChatListItem } from '../Models/ChatListItem'
import { Message } from '../Models/Message'
import { Chat } from '../Models/Chat'
import { ITicketService } from '../Interfaces/ITicketService'
import { IChatUseCase } from '../Interfaces/IChatUseCase'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../IOC/types'

@injectable()
export class ChatUseCase implements IChatUseCase {
    private database: IDatabase
    private ticketService: ITicketService

    constructor(@inject(TYPES.Database) database: IDatabase,
                @inject(TYPES.TicketService) ticketService: ITicketService) {
        this.database = database
        this.ticketService = ticketService
    }

    private static getLastMessage(messages: Message[]): Message {
        return messages.sort((a, b) => a.date > b.date ? -1 : 1)[0]
    }

    async getChatsList(requester: string): Promise<ChatListItem[]> {
        return (await this.database.getChats()).map(chat => ({
            chatId: chat.id,
            contact: chat.customer === requester ? chat.consultant : chat.customer,
            lastMessage: ChatUseCase.getLastMessage(chat.messages)
        }))
    }

    async getChatsByCustomer(customer: string): Promise<ChatListItem[]> {
        return (await this.database.getChatsByCustomer(customer)).map(chat => ({
            chatId: chat.id,
            contact: chat.consultant,
            lastMessage: ChatUseCase.getLastMessage(chat.messages)
        }))
    }

    async getChat(chatId: string): Promise<Chat> {
        return this.database.getChatById(chatId)
    }

    async createNewChat(chat: Chat): Promise<Chat> {
        return this.database.saveChat(chat)
    }

    async saveNewMessage(chatId: string, message: Message): Promise<void> {
        let chat = await this.database.getChatById(chatId)
        chat.messages.push(message)
        chat.lastMessage = message.date
        this.database.updateChat(chat)
    }

    async readChat(chatId: string, date: Date, requester: string): Promise<void> {
        let chat = await this.database.getChatById(chatId)
        if (chat.customer === requester) {
            chat.lastReadCustomer = date
        } else {
            chat.lastReadConsultant = date
        }
        this.database.updateChat(chat)
    }

    async createTicket(chatId: string): Promise<Chat> {
        let chat = await this.database.getChatById(chatId)
        chat.ticket = this.ticketService.getTicket(chatId)
        this.database.updateChat(chat)
        return chat
    }

    async deleteChat(chatId: string, requester: string): Promise<void> {
        let chat = await this.database.getChatById(chatId)
        if (chat.customer === requester) {
            chat.visibleFor = chat.visibleFor === 'both' ? 'consultant' : 'nobody'
        } else {
            chat.visibleFor = chat.visibleFor === 'both' ? 'customer' : 'nobody'
        }
        this.database.updateChat(chat)
    }
}
