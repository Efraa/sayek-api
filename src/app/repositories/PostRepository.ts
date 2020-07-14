import { Repository, getRepository } from 'typeorm'
import { Post } from '../../database/entities/Post'

export class PostRepository {
  private repo: Repository<Post>

  constructor() {
    this.repo = getRepository(Post)
  }

  getById = async (id: number) => await this.repo.findOne({ id })

  create = async (payload: any) => this.repo.create(payload as Post)

  save = async (post: Post) => await this.repo.save(post)
}
