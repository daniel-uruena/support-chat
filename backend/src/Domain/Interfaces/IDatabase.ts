import { Chat } from '../Models/Chat'

export interface IDatabase {
    getChats(): Promise<Chat[]>
    getChatById(chatId: string): Promise<Chat>
    getChatsByCustomer(customer: string): Promise<Chat[]>
    saveChat(chat: Chat): Promise<Chat>
    updateChat(chat: Chat): Promise<void>
    deleteChat(chatId: string): Promise<Chat>
}
