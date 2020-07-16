import { config } from '../../config'
import { Notification } from 'src/database/entities/Notification'
import { NotificationMapper } from '../domain/mappers/NotificationMapper'
import { NotificationRepository } from '../repositories/NotificationRepository'
import { NotificationDTO } from '../domain/dtos/NotificationDTO'

export class NotificationService {
  constructor(
    private _notificationRepository: NotificationRepository,
    private _notificationMapper: NotificationMapper,
  ) {}

  mapToEntity = async (notificationPayload: any): Promise<Notification> =>
    await this._notificationMapper.mapToEntity(notificationPayload)

  create = async (notificationEntity: Notification): Promise<NotificationDTO> =>
    await this._notificationRepository.save(notificationEntity)
      .then(notification => this._notificationMapper.mapToDTO(notification))

  getById = async (id: number) =>
    await this._notificationRepository.getById(id)


  async send(payload: NotificationDTO) {}

  async list(query: {
    userId: number,
    perPage?: number,
    page?: number,
  }) {}

  async count(userId: number): Promise<NotificationDTO[]> {
    return []
  }

  async read(userId: number, notificationId: number) {}

  async readAll(userId: number) {}

  async delete(userId: number, notificationId: number) {}

  async deleteAll(userId: number) {}
}
