const TYPES = {
    Server: Symbol.for('IServer'),
    Config: Symbol.for('IConfig'),
    Express: Symbol.for('express'),
    ChatUseCase: Symbol.for('IChatUseCase'),
    Database: Symbol.for('IDatabase'),
    TicketService: Symbol.for('ITicketService'),
    WebSocketServer: Symbol.for('IWebSocketServer')
}

export { TYPES }
