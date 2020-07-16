import { Mapper } from 'ts-simple-automapper'
import { Notification } from '../../../database/entities/Notification'
import { NotificationRepository } from '../../repositories/NotificationRepository'
import { NotificationDTO } from '../dtos/NotificationDTO'

export class NotificationMapper {
  constructor(
    private _notificationRepository: NotificationRepository,
  ) {}

  public mapToDTO(from: Notification): NotificationDTO {
    const notificationDTO: NotificationDTO = new Mapper().map(from, new NotificationDTO())
    return notificationDTO
  }

  public mapToEntity = async (from: any): Promise<Notification> =>
    await this._notificationRepository.create(from)

  public mapListToDTO(notifications: Notification[]): NotificationDTO[] {
    return notifications.map(notification => this.mapToDTO(notification))
  }
}
