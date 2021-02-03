import { IDatabase } from '../../Domain/Interfaces/IDatabase'
import { Chat } from '../../Domain/Models/Chat'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../IOC/types'
import { IConfig } from '../../Domain/Interfaces/IConfig'
import mongoose, { Mongoose, Schema, Model } from 'mongoose'

@injectable()
export class MongoDatabase implements IDatabase {

    private collection: string
    private chatModel: Model<any>

    constructor(@inject(TYPES.Config) config: IConfig) {
        this.collection = config.database.table
        const connectionString =
            `${config.database.protocol}://${config.database.host}:${config.database.port}/${config.database.dbName}`
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        let schema = new mongoose.Schema(this.chatSchema(), { toObject: { getters: true } })
        this.chatModel = mongoose.model(this.collection, schema)
    }

    private chatSchema() {
        return {
            id: String,
            customer: String,
            consultant: String,
            visibleFor: String,
            ticket: String,
            lastReadCustomer: Date,
            lastReadConsultant: Date,
            lastMessage: Date,
            messages: [{content: String,
                author: String,
                date: Date}]
        }
    }

    async deleteChat(chatId: string): Promise<Chat> {
        let chat = await this.chatModel.findById(chatId)
        this.chatModel.deleteOne({ id: chatId })
        return chat
    }

    async getChatById(chatId: string): Promise<Chat> {
        return this.chatModel.findById(chatId);
    }

    async getChats(): Promise<Chat[]> {
        return this.chatModel.find();
    }

    async getChatsByCustomer(customer: string): Promise<Chat[]> {
        return this.chatModel.find({ customer });
    }

    async saveChat(chat: Chat): Promise<Chat> {
        return this.chatModel.create(chat);
    }

    async updateChat(chat: Chat): Promise<void> {
        this.chatModel.updateOne({ id: chat.id }, chat)
    }

}
