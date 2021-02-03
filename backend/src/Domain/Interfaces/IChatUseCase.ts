import { ChatListItem } from '../Models/ChatListItem'
import { Chat } from '../Models/Chat'
import { Message } from '../Models/Message'

export interface IChatUseCase {
    getChatsList(requester: string): Promise<ChatListItem[]>
    getChatsByCustomer(customer: string): Promise<ChatListItem[]>
    getChat(chatId: string): Promise<Chat>
    createNewChat(chat: Chat): Promise<Chat>
    saveNewMessage(chatId: string, message: Message): Promise<void>
    readChat(chatId: string, date: Date, requester: string): Promise<void>
    createTicket(chatId: string): Promise<Chat>
    deleteChat(chatId: string, requester: string): Promise<void>
}
