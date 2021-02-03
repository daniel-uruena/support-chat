import { Message } from './Message'
import { v4 as uuid } from 'uuid'

export class Chat {
    id: string
    customer: string
    consultant?: string
    visibleFor: 'customer' | 'consultant' | 'both' | 'nobody'
    ticket?: string
    lastReadCustomer?: Date
    lastReadConsultant?: Date
    lastMessage?: Date
    messages: Message[]

    constructor(customer: string) {
        this.id = uuid()
        this.customer = customer
        this.visibleFor = 'both'
        this.messages = []
    }
}
