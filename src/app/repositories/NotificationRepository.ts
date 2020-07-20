import { Repository, getRepository } from 'typeorm'
import { Notification } from '../../database/entities/Notification'

export class NotificationRepository {
  private repo: Repository<Notification>

  constructor() {
    this.repo = getRepository(Notification)
  }

  getById = async (id: number) => this.repo.findOne({ id })

  create = async (payload: any) => this.repo.create(payload as Notification)

  save = async (notification: Notification) => this.repo.save(notification)
}
