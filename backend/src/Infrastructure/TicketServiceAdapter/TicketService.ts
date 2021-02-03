import { ITicketService } from '../../Domain/Interfaces/ITicketService'
import { injectable } from 'inversify'

@injectable()
export class TicketService implements ITicketService {

    getTicket(chatId: string): string {
        return Buffer.from(chatId).toString('base64')
    }

}
