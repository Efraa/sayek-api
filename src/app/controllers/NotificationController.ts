import { NotificationService } from '../services/NotificationService'
import { SocketServer } from '../../socket/SocketServer'

export class NotificationController {
  constructor(
    private _notificationService: NotificationService,
    private _socket: SocketServer
  ) {}

  async create(payload: any) {
    return payload
  }

  async collection(query: {
    userId: number
    perPage?: number
    page?: number
  }) {}

  async count(userId: number) {}

  async read(userId: number, notificationId: number) {}

  async readAll(userId: number) {}

  async delete(userId: number, notificationId: number) {}

  async deleteAll(userId: number) {}
}
