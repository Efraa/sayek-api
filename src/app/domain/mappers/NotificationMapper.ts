import { Mapper } from 'ts-simple-automapper'
import { Notification } from '../../../database/entities/Notification'
import { NotificationRepository } from '../../repositories/NotificationRepository'
import { NotificationDTO } from '../dtos/NotificationDTO'

export class NotificationMapper {
  constructor(private _notificationRepository: NotificationRepository) {}

  mapToDTO(from: Notification): NotificationDTO {
    const notificationDTO: NotificationDTO = new Mapper().map(
      from,
      new NotificationDTO()
    )
    return notificationDTO
  }

  mapToEntity = async (from: any): Promise<Notification> =>
    this._notificationRepository.create(from)

  mapListToDTO = (notifications: Notification[]): NotificationDTO[] =>
    notifications.map(notification => this.mapToDTO(notification))
}
