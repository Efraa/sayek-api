import socketIO from 'socket.io'
import { Server } from 'http'

// Domains Sockets
import { UserSocket } from '../app/sockets/UserSocket'

export class SocketServer {
  private io: SocketIO.Server
  private user: UserSocket

  constructor(server: Server) {
    this.io = socketIO(server)
    this.io.on('connection', (socket: SocketIO.Server) =>
      this.buildSockets(socket))
  }

  private buildSockets(socket: SocketIO.Server): void {
    this.user = new UserSocket(socket, this.io)
  }

  get userSocket(): UserSocket {
    return this.user
  }
}
