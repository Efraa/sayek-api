import socketIO from 'socket.io'
import { Server } from 'http'
import { Events } from './Events'

export class SocketServer {
  public socketIO: SocketIO.Server

  constructor(server: Server) {
    this.socketIO = socketIO(server)
    this.socketIO.on(Events.CONNECTION, (client: SocketIO.Server) =>
      console.log('Client connected'))
  }
}
