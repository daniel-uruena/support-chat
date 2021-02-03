import { Message } from './Message'

export class ChatListItem {
    chatId: string
    contact?: string
    lastMessage: Message

    constructor(chatId: string, lastMessage: Message) {
        this.chatId = chatId
        this.lastMessage = lastMessage
    }

}
