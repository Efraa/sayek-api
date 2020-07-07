import { app, initializeApplication } from './app'
import http, { Server } from 'http'
import { SocketServer } from './socket'

const server: Server = http.createServer(app)
const socket = new SocketServer(server)

initializeApplication().then(() =>
  server.listen(app.get('port'), () =>
    console.log('Running on port', app.get('port'))))

export { socket }
