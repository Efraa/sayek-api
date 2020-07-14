import { Repository, getRepository } from 'typeorm'
import { Comment } from '../../database/entities/Comment'

export class CommentRepository {
  private repo: Repository<Comment>

  constructor() {
    this.repo = getRepository(Comment)
  }

  getById = async (id: number) => await this.repo.findOne({ id })

  create = async (payload: any) => this.repo.create(payload as Comment)

  save = async (comment: Comment) => await this.repo.save(comment)
}
