import { createContainer } from './src/IOC/CreateContainer'
import { Container } from 'inversify'
import { IServer } from './src/Domain/Interfaces/IServer'
import { TYPES } from './src/IOC/types'

let container: Container = createContainer()
let app = container.get<IServer>(TYPES.Server)
app.start()


