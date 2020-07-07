export class UserSocket {
  constructor(
    private _socket: SocketIO.Server,
    private _io?: SocketIO.Server,
  ) {}

  emit () {
    this._socket.emit('test', () => console.info('test'))
  }
}
